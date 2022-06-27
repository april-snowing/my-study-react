import React from "react";
import "./todo.css";
import { Input, Space, Table, Popconfirm } from "antd";
import axios, { Axios } from "axios";
const { Search } = Input;
export class TodoList extends React.Component {
    state = {
        list: [],
        columns: [
            {
                title: '任务编号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '任务名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '任务描述',
                dataIndex: 'des',
                key: 'des',
            },
            {
                title: '操作',
                dataIndex: 'do',
                key: 'do',
                render: (_, record) =>
                    this.state.list.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ]
    }
    handleDelete = async (key) => {
        await axios.delete(`http://localhost:3001/data/${key}`);
        this.loadList();
    }
    onSearch = (value) => {
        console.log(value)
    }
    loadList = async () => {
        const res = await axios.get("http://localhost:3004/data");
        this.setState({
            list: res.data
        })
    }
    componentDidMount() {
        this.loadList();
    }
    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={this.onSearch}
                />
                <Table bordered dataSource={this.state.list} columns={this.state.columns} />
            </div>
        )
    }
}