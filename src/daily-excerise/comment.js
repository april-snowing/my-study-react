import React from "react";
import "./comment.css"
export class Comment extends React.Component {
    state = {
        data: {
            tabs: [
                { id: 1, type: "hot", name: "hot order" },
                { id: 2, type: "time", name: "time order" }
            ],
            active: "hot",
            comments: [
                { id: 1, content: "I am the first comment", date: new Date("2022-01-09 12:00:00"), like: 0 },
                { id: 2, content: "I am the second comment", date: new Date("2021-01-09 12:00:00"), like: 1 },
                { id: 3, content: "I am the third comment", date: new Date("2020-01-09 12:00:00"), like: -1 }
            ]
        }
    }
    switchTab(type) {
        console.log(type)
        this.setState({
            data: {
                ...this.state.data,
                active: type
            }
        })
    }
    changeClick = (curItem) => {
        let { id, like } = curItem;
        let { comments } = this.state.data;
        this.setState({
            data: {
                ...this.state.data,
                comments: comments.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            like: like === 1 ? 0 : 1
                        }
                    }
                    return item;
                })
            }
        })
    }
    render() {
        return (
            <div >
                <div className="tab">
                    <ul>
                        {this.state.data.tabs.map(tab => (
                            <li className={tab.type === this.state.data.active ? 'active' : ""}
                                key={tab.id}
                                onClick={() => this.switchTab(tab.type)}
                            >
                                {tab.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="comment-list">
                    <ul>
                        {this.state.data.comments.map(comment => (
                            <li key={comment.id}>
                                <div>{comment.content}</div>
                                {/* <div>{comment.date}</div> */}
                                <div className={comment.like === 1 ? 'attr liked' : "attr"} onClick={() => this.changeClick(comment)}>like</div>
                                <div className={comment.like === -1 ? 'attr hated' : "attr"}>hate</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}