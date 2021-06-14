import React, { Component } from 'react'
import { Table, InputNumber, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { updateGoods, asyncDeleteGoods } from './store/actionCreators'
import { connect } from 'react-redux'
const { Column } = Table;
const { confirm } = Modal;

class Cart extends Component {
    // update = (id, num) => {
    //     store.dispatch(updateGoods({ id, num }))
    // }
    delete = id => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确定需要删除吗?',
            cancelText: '取消',
            okText: '确定',
            onOk:() =>{
                this.props.delete(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    render() {
        return (
            <div>
                <Table dataSource={this.props.goodsList} pagination={false}>
                    <Column title="名字" dataIndex="name" />
                    <Column title="图片" render={(text, record) => (
                        <img style={{ width: 100, height: 100 }} src={record.url}></img>
                    )} />
                    <Column title="数量" render={(text, record) => (
                        <InputNumber min={1} defaultValue={record.num} onChange={num => { this.props.update(record.id, num) }} />
                    )} />
                    <Column title="单价" dataIndex="price" />
                    <Column title="总价" render={(text, record) => (
                        <span>{record.num * record.price}</span>
                    )} />
                    <Column title="操作" dataIndex="id" render={id => (
                        <Button type="danger" onClick={() => { this.delete(id) }}>删除</Button>
                    )} />
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const copyGoodsList = JSON.parse(JSON.stringify(state))
    copyGoodsList.forEach(item => {
        item.key = item.id
    })
    return {
        goodsList: copyGoodsList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update: function(id,num) {
            dispatch(updateGoods({id,num}))
        },
        delete(id) {
            dispatch(asyncDeleteGoods(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)