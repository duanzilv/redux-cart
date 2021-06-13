import React, { Component } from 'react'
import { Table, InputNumber, Button} from 'antd';
import store from './store/index'
import { updateGoods } from './store/actionCreators'
const { Column } = Table;

class Cart extends Component {
    constructor() {
        super()
        const unsubscribe  = null
        const list = store.getState();
        list.forEach(item => {
            item.key = item.id;
        });
        this.state = {
            goodsList: list
        }
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            const list = store.getState();
            list.forEach(item => {
                // key是Table组件中要求要有的
                item.key = item.id;
            });

            this.setState({
                goodsList: list
            });
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    update = (id,num) => {
        store.dispatch(updateGoods({id,num}))
    }
    render() {
        const { goodsList } = this.state
        return (
            <div>
                <Table dataSource={goodsList} pagination={false}>
                    <Column title="名字" dataIndex="name" />
                    <Column title="图片" render={(text, record) => (
                        <img style={{width: 100,height:100}} src={record.url}></img>
                    )} />
                    <Column title="数量" render={(text, record) => (
                        <InputNumber min={1} defaultValue={record.num} onChange={num => {this.update(record.id,num)}}/>
                    )} />
                    <Column title="单价" dataIndex="price" />
                    <Column title="总价" render={(text, record) => (
                        <span>{record.num * record.price}</span>
                    )} />
                     <Column title="操作" render={(id) => (
                        <Button type="danger">删除</Button>
                    )} />
                </Table>
            </div>
        )
    }
}

export default Cart