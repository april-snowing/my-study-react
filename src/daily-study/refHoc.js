import React, { useEffect, useRef } from "react";

function HOC(Component) {
    class Warp extends React.Component {
        render() {
            const { forwardedRef, ...otherProps } = this.props;
            return <Component ref={forwardedRef} {...otherProps}></Component>
        }
    }
    return React.forwardRef((props, ref) => <Warp forwardedRef={ref} {...props}></Warp>)
}
class Index extends React.Component {
    componentDidMount() {
        console.log("66666")
    }
    render() {
        return <div> hello RefHoc</div>
    }
}
const HocIndex = HOC(Index, true);

export default () => {
    const node = useRef();
    useEffect(() => {
        node.current.componentDidMount()
    }, []);
    return <div><HocIndex ref={node}></HocIndex></div>
}