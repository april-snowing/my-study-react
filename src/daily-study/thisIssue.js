import React from "react";

export class ThisIssue extends React.Component {
    //状态改变，永远不要直接修改状态的值，要基于当前的状态创建新的值  
    state = {
        count: 0,
        list: [1, 2, 3, 4],
        person: {
            name: "gao",
            age: "18"
        }
    }
    //这里必须是箭头函数，箭头函数没有this,默认this为父级this ,
    clickHandler = (e, message) => {
        console.log(e, message)
        // this.setState({
        //     //普通值
        //     count: this.state.count + 1,  //不能使用++ 相当于直接给state 赋值了
        //     //数组
        //     list: [...this.state.list, 5],
        //     //对象
        //     person: {
        //         ...this.state.person,
        //         name: "xue"
        //     }
        // });
        //删除数组，filter,不会改变原数组
        this.setState({
            list: this.state.list.filter(v => v !== 2)
        })
    }
    // 这种有两种方式解决this问题
    //1.constructor 里 this.clickHandler = this.clickHandler.bind(this)
    //2.jsx里使用箭头函数 onClick={()=>this.clickHandler()}
    // clickHandler (e, message){
    //     console.log(e, message)
    //     this.setState({
    //         count: this.state.count + 1  
    //     })
    // }
    render() {
        //事件传递除e外多个参数
        return (
            <>
                <ul>
                    {this.state.list.map(item => <li key={item}>{item}</li>)}
                </ul>
                <div>{this.state.person.name} is {this.state.person.age}</div>
                <button onClick={(e) => this.clickHandler(e, "I am message")}>{this.state.count}</button>
            </>
        )
    }
}