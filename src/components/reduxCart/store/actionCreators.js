import { ADD_GOODS,UPDATE_GOODS,DELETE_GOODS} from './actionType'

// 加入购物车
export const addGoods = (goods) => {
    return {
        type: ADD_GOODS,
        payload: goods
    }
}

// 修改商品数量
export const updateGoods = (goods) =>{
    return {
        type: UPDATE_GOODS,
        payload: goods
    }
}

// 删除商品
export const deleteGoods = id => {
    return {
        type: DELETE_GOODS,
        payload: id
    }
}

// 商品删除异步action
export const asyncDeleteGoods = id => {
    return dispatch => {
        setTimeout(() => {
            dispatch(deleteGoods(id))
        },1000)
    }
}