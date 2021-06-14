import React, { Component } from 'react'
import styles from './index.module.css'
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import GoodsList from './GoodsList'
import Cart from './Cart'
import NotFound from './NotFound'
import { connect } from 'react-redux'


class Index extends Component {
    componentDidMount() {
        // 离线缓存
        window.addEventListener('beforeunload', () => {
            // 保存到本地
            window.localStorage.setItem('goodsList', JSON.stringify(this.props.goodsList))
        })
    }

    componentWillUnmount() {
        // 组件销毁的时候，移除事件监听
        window.removeEventListener('beforeunload',() => {})
    }

    render() {
        return (
            <Router>
                <div>
                    <h2 className={styles.title}>
                        水果-商场
                        <p className={styles.links}>
                            <Link to='/GoodsList'>商品列表</Link> &nbsp; &nbsp;
                            <Link to='/Cart'>购物车{this.props.count > 0 && `(${this.props.count})`}</Link> &nbsp; &nbsp;
                        </p>
                    </h2>

                    <div>
                        <Switch>
                            <Route path='/GoodsList' component={GoodsList} />
                            <Route path='/Cart' component={Cart} />
                            <Redirect exact from='/' to='/GoodsList' />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
/**
 * state 就是仓库中的上牌列表数组
 * 
 * mapStateToProps 
 *  箭头函数中的代码
 * 第一次渲染组件的时候,会执行一遍
 * 当仓库中的数据发生改变的时候,也会自动执行(自动监听)
 */

const mapStateToProps = (state) => {
    function calcTotalCount() {
        let totalCount = 0
        state.forEach(item => {
            totalCount += item.num
        })
        return totalCount
    }

    return {
        count: calcTotalCount(),
        goodsList: state
    }
};

export default connect(mapStateToProps,null)(Index);