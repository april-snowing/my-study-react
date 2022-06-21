import React from "react";
import ReactDom from "react-dom";

/** @jsxRuntime classic */
// concurrent mode
let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletetions = null;
function workLoop(deadline) {
    let shouldYield = false; // on / off
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }
    shouldYield = deadline.timeRemaining < 1;
    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop); // loop
function commitRoot() {
    // TO add node to Root
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}
const isEvent = key => key.startsWith("on");
const isProperty = key => key !== "children" && !isEvent(key);
const isGone = (prev, next) => key => !(key in next);
const isNew = (prev, next) => key => prev[key] !== next[key]
function updateDom(dom, prevProps, nextProps) {
    //remove old or change event listener
    Object.keys(prevProps).filter(isEvent).filter(key => {
        !(key in nextProps) || isNew(prevProps, nextProps)
    }).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(
            eventType,
            prevProps[name]
        )
    })
    //remove old properties
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = "";
        })
    // add new eventListener
    Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
    });
    // set new or change properties
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew)
        .forEach(name => {
            dom[name] = nextProps[name];
        });

}
function commitWork(fiber) {
    if (!fiber) {
        return
    }
    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === "placement" && fiber.dom !== null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === "Delete") {
        commitDeletion(fiber, domParent)
    } else if (fiber.effectTag === "update" && fiber.dom !== null) {
        updateDom(
            fiber.dom,
            fiber.alternate.props,
            fiber.props
        )
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling)
}
function commitDeletion(fiber, domParent) {
    if (fiber.dom !== null) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}
// Fiber 
function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }


    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent
    }
}
let wipFiber = null;
let hookIndex = null;
function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}
function useState(inital) {
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
    const hook = {
        state: oldHook ? oldHook.state : inital,
        queue: []
    }
    const actions = oldHook ? oldHook.queue : [];
    actions.forEach(action => {
        hook.state = action(hook.state);
    })
    const setState = action => {
        hook.queue.push(action)
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
        }
        nextUnitOfWork = wipRoot;
        deletetions = []
    }
    wipFiber.hooks.push(hook);
    console.log(wipFiber.hooks)
    hookIndex++;
    return [hook.state, setState]
}
function updateHostComponent(fiber) {
    // TODO add dom node
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children);
}
function reconcileChildren(wipFiber, elements) {
    let prevSibling = null;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let index = 0;
    while (index < elements.length || oldFiber != null) {
        let element = elements[index];
        // Fiber  = {
        //   type: element.type,
        //     props: element.props,
        //     parent: Fiber,
        //     dom : null
        //     sibling : Fiber
        //     child : Fiber
        //     alternate :OldFiber
        // }
        // to compare oldFiber with element 
        let newFiber = null;

        const sameType = oldFiber && element && element.type === oldFiber.type;
        if (sameType) { //TODO update the node
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'update'
            }
        }
        if (element && !sameType) { // add this node
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: "placement"
            }
        }
        if (oldFiber && !sameType) { // delete the oldFiber`s node
            oldFiber.effectTag = "delete";
            deletetions.push(oldFiber)
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        //the first child
        if (index === 0) {
            wipFiber.child = newFiber;
        } else { // the other child mark as the sibling of the first child
            // the next one is the sibling of the previous one
            prevSibling.sibling = newFiber;
        }
        // save the previous one
        prevSibling = newFiber;
        index++;
    }
}
function createDom(fiber) {
    const dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);
    //添加 props 属性
    updateDom(dom, {}, fiber.props);
    return dom
}
function render(element, container) {
    // set nextUnitOfWork once reander, rootFiber
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    }
    deletetions = [];
    nextUnitOfWork = wipRoot;
}
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
        }
    }
}
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}
const Didact = {
    createElement,
    useState,
    render
}
/** @jsx Didact.createElement */

// support function component
function App(props) {
    return <div>April Adventure</div>
}
function Counter() {
    const [state, setState] = Didact.useState(1);
    return (
        <h1 onClick={() => setState(c => c + 1)}>
            Count : {state}
        </h1>
    )
}
// Virtual Dom
const element = (
    <div name="div">
        <h1 name="hi"> Hello world</h1>
        <p name="description">I am April</p>
        <App content="April Adventure"></App>
        <Counter></Counter>
    </div>
)

// change Actual DOM
const container = document.getElementById("root");
Didact.render(element, container);
