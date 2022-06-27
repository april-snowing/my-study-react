import React from "react";
import PropTypes from "prop-types";
// 函数组件 props 设置默认值，在<List />的时候可以传
const List = ({ colors = ["red", "blue"] }) => {
    const arr = colors;
    const lis = arr.map((item, index) => <li key={index}>{item}</li>);
    return <ul> {lis}</ul>
}
// 类组件 设置默认props值
class ListC extends React.Component {
    static defaultProps = {
        colors: ["green", "orange"]
    }
    componentWillUnmount() {
        console.log("ListC componentWillUnmount")
    }
    render() {
        return <ul> {this.props.colors.map((item, index) => <li key={index}>{item}</li>)}</ul>
    }
}

// 四种常见结构
// 常见类型 : array bool func number object string
// eg: optionalFunc : PropTypes.func
// React 元素类型 ： element
// 必填项 ： isRequired
// eg : requiredFunc : PropTypes.func.isRequired
// 特定结构对象 ： shape({})
// optionalObjectWithShape : PropTypes.shape({color : PropTypes.string,fontSize: PropTypes.number})
List.propTypes = {
    colors: PropTypes.array
}

//组件的生命周期
// 挂载阶段
// constructor -----> render ----------->componentDidMount
// 更新阶段
// render------> componentDidUpdate
//卸载阶段
// componentWillUnmount
export class ComponentMore extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor") //第一次执行实例化
    }
    state = {
        count: 0
    }
    componentDidMount() {  // 发送HTTP请求，操作DOM
        console.log("componentDidMount")  //第一次挂载执行一次
    }
    componentDidUpdate() {
        console.log("componentDidUpdate") //每次更新执行 // 千万不要调用setState  
    }
    clickHander = () => {
        this.setState({   // render componentDidUpdate
            count: this.state.count + 1
        })
    }
    render() {
        console.log("render")  // 千万不要调用setState  
        return (
            <div>
                {this.state.count < 5 && <ListC></ListC>}
                <List></List>
                <button onClick={this.clickHander}> {this.state.count}</button>
            </div>
        )
    }
}
