import { ADD_GOODS,UPDATE_GOODS} from './actionType'

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