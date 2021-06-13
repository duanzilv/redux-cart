import React, { Component } from 'react'
import styles from './index.module.css'
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import GoodsList from './GoodsList'
import Cart from './Cart'
import NotFound from './NotFound'
import store from './store'


class Index extends Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.caclCount()
        store.subscribe(() => {
            this.caclCount()
        })
    }

    caclCount() {
        const list = store.getState()
        let count = 0
        list.forEach(item => {
            count += item.num
        })
        this.setState({
            count
        })
    }

    render() {
        const { count } = this.state
        return (
            <Router>
                <div>
                    <h2 className={styles.title}>
                        水果-商场
                        <p className={styles.links}>
                            <Link to='/GoodsList'>商品列表</Link> &nbsp; &nbsp;
                            <Link to='/Cart'>购物车{count > 0 && `(${count})`}</Link> &nbsp; &nbsp;
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

export default Index