import React from "react";
import RefHoc from "./refHoc";
// lazy 接收一个函数，该函数返回一个promise,该promise resovle 一个 default export 的 react 组件
const LazyComponent = React.lazy(() => import("./refHoc"));


export class LazyIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data1: "" }

    }
    componentDidMount() {
        const data = new Promise((resolve) => {
            setTimeout(() => {
                resolve("3232323232")
            }, 5000);
        }).then(v => {
            console.log(v)
            this.setState({ data1: v })
        })
    }
    render() {
        console.log("render")
        return <div>
            <React.Suspense fallback={<div>loading</div>}>
                {/* <LazyComponent></LazyComponent> */}
                {/* <div>{this.state.data1}</div> */}
                {
                    [1, 2, 3].map(item => <span key={item} >{item}</span>)
                }
            </React.Suspense>
        </div>
    }
}