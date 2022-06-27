// jsx列表渲染 map

// jsx条件渲染 && || 三元运算符

// jsx多分支逻辑渲染  处理成一个函数，模板中调用函数
// eg:getHtag

// jsx样式控制
//  行内样式，style 属性 添加样式对象， eg: styleColor
// 类名样式 className
// 动态类名 eg： active
import "./app.css";
const stypeColor = { color: 'red', fontSize: '30px' };

const activeFlag = false;
const getHtag = (type) => {
    if (type === 1) {
        return <h1>this is h1</h1>
    } else if (type === 2) {
        return <h2>this is h2</h2>
    } else if (type === 3) {
        return <h3>this is h3</h3>
    }
}

let student = [
    { id: 1, name: "gao" },
    { id: 2, name: "xue" },
    { id: 3, name: "ling" },
]

let flag = false;
function Jsx() {
    return (
        <div className="App" style={stypeColor}>
            {flag && student.map(stu => <li key={stu.id}>{stu.name}</li>)}
            {flag ? student.map(stu => <li key={stu.id}>{stu.name}</li>) : "no student"}
            {getHtag(1)}
            {getHtag(2)}
            <div class={activeFlag ? "active" : ""}></div>
        </div>
    );
}

export default Jsx;
