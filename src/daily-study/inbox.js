// forwardRef 使用
import { RefBasic } from "../daily-study/refBasic.js"
// 高阶组件转发ref
import RefHoc from "../daily-study/refHoc.js"
//懒加载componet 
import { LazyIndex } from "../daily-study/lazy"
// jxs的基础
import Jsx from "../daily-study/jsx";
// react this 问题  和状态不可变特性
import { ThisIssue } from "../daily-study/thisIssue.js";
// 受控组件和非受控组件
import { Form } from "../daily-study/form";
//组件间通信
import { Ineraction } from "./interaction";
//组件进阶
import { ComponentMore } from "./componentMore";
export function Inbox() {
    return <ComponentMore></ComponentMore>
}