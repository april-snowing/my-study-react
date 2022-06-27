import React, { createContext } from "react";

// context-1.创建Context对象
const { Provider, Consumer } = createContext();


function SonF(props) {
    // 接受父组件传递的属性值
    // props是只读的，只能读取不能修改（单向数据流）
    // 可以传递任意类型的值  数字、字符串、布尔值、数组、对象、函数、JSX
    function clickHandler() {
        props.changeMsg("I change my father message,at the same time update my sibling")
    }
    return <div onClick={clickHandler}>SonF===== {props.message} <SonF1></SonF1></div>
}

function SonF1(props) {
    return (
        <Consumer>
            {value => <div>I am SonF1 ,{value}</div>}
        </Consumer>
    )
}
class SonC extends React.Component {
    render() {
        return <div> Sonc===== {this.props.message}</div>
    }
}



export class Ineraction extends React.Component {
    state = {
        message: "I am come from my father"
    }
    changeMsg = (newMsg) => {
        this.setState({
            message: newMsg
        })
    }
    render() {
        // -----父组件传递给子组件
        // <SonC message={this.state.message}></SonC>   
        // --------子组件传递给父组件
        // 父组件方法传递给子组件，子组件调用并传入新值
        // <SonF changeMsg={this.changeMsg} message={this.state.message}></SonF>
        // ---------兄弟组件通信
        // 将共享的状态提升到父组件，父组件提供属性值  提供共享状态给A 提供修改方法给B,  B修改后 
        //<SonC message={this.state.message}></SonC>
        //<SonF changeMsg={this.changeMsg} ></SonF>
        //-----------跨组件通信Context
        // 父组件 <Provider value={this.state.message}> </Provider> 孙组件 <Consumer>  { value =>  } </Consumer >

        // context-2. 提供数据
        return (
            <Provider value={this.state.message}>
                <div>
                    {this.state.mesage}
                    <SonC message={this.state.message}></SonC>
                    <SonF changeMsg={this.changeMsg} message={this.state.message}></SonF>
                </div>
            </Provider>
        )
    }
}