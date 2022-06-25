import React from "react";
function Son(props) {
    const { grandRef } = props;
    return (
        <div>
            <div>I am April</div>
            <span ref={grandRef}>这个是想要获取元素</span>
        </div>
    )
}
class Father extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Son grandRef={this.props.grandRef}></Son>
            </div>
        )
    }
}
const NewFather = React.forwardRef((props, ref) => <Father grandRef={ref}></Father>)
class GrandFather extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        // ref 不允许通过组件属性传递
        return <NewFather ref={this.props.grandRef}></NewFather>
    }
}
const rules = {
    validate: (value) => {
        console.log(value)
        console.log(value.length)
        console.log(9 > 5)
        return value.length > 5
    }
}
export const RefBasic = (props) => {
    // useForm的校验原理吧
    const register = ({ validate }) => {
        return (node) => {
            if (node === null || !node) return;
            let value = node.innerHTML;
            if (validate(value)) {
                console.log(value.slice(0, -3))
                node.innerHTML = `我太长了，我省略显示为:${value.slice(0, -3)}${"*".repeat(3)}`
            }
        }
    }
    return <GrandFather grandRef={register(rules)}></GrandFather>
}