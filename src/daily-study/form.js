//受控组件
import React, { createRef } from "react"
export class Form extends React.Component {
    msgRef = createRef();
    state = {
        message: "this is a message"
    }
    changeHandler = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    getInputV = (e) => {
        console.log(this.msgRef.current.value)
    }
    render() {
        return (
            <>
                受控组件
                <input value={this.state.message} onChange={this.changeHandler}></input>
                非受控组件
                <input ref={this.msgRef}></input>
                <button onClick={this.getInputV}>获取非受控input value</button>
            </>
        )
    }
}