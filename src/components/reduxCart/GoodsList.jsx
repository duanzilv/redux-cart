import React, { Component } from 'react'
import styles from './GoodsList.module.css'
import { Button } from 'antd';
import store from './store/index'
import { addGoods } from './store/actionCreators'

class GoodsList extends Component {
    constructor() {
        super()

        this.state = {
            fruitList: [
                { id: 10001, num: 1, url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3779414930,1104551347&fm=26&gp=0.jpg', name: '苹果', price: 5 },
                { id: 10002, num: 1, url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3039944399,2108245081&fm=26&gp=0.jpg', name: '香蕉', price: 2.5 },
                { id: 10003, num: 1, url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3403612802,3855938735&fm=26&gp=0.jpg', name: '哈密瓜', price: 20 },
                { id: 10004, num: 1, url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3146557428,1379145321&fm=26&gp=0.jpg', name: '榴莲', price: 35 },
            ]
        }
    }
    addGoods = goods => {
        store.dispatch(addGoods(goods))
    }
    render() {
        const { fruitList } = this.state
        return (
            <div className={styles.container}>
                <ul>
                    {
                      fruitList.map(item => {
                          return <li className={styles.item} key={item.id}>
                              <img className={styles.img} src={item.url} alt="" />
                              <p>商品名: {item.name}</p>
                              <p>￥: {item.price}</p>
                              <Button style={{backgroundColor:"#67c23a",color:"#fff",marginTop:10}} onClick={() =>{this.addGoods(item)}}>加入购物车</Button>
                          </li>
                      })
                    }
                </ul>
            </div>
        )
    }
}

export default GoodsList