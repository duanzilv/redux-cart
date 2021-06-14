import { ADD_GOODS, UPDATE_GOODS, DELETE_GOODS } from './actionType'
// 从本地取出刷新或是关闭之前的结果
const initState = JSON.parse(window.localStorage.getItem('goodsList') || '[]')

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_GOODS:
            const oldAddList = JSON.parse(JSON.stringify(state))
            const oldGoods = oldAddList.find(item => item.id === action.payload.id)
            if (oldGoods) {
                oldGoods.num += action.payload.num
            } else {
                oldAddList.push(action.payload)
            }
            return oldAddList;

        case UPDATE_GOODS:
            const updateList = JSON.parse(JSON.stringify(state))
            const updateGoods = updateList.find(item => item.id === action.payload.id)
            updateGoods.num = action.payload.num
            return updateList;

        case DELETE_GOODS:
            const deleteList = JSON.parse(JSON.stringify(state)) 
            const goodsIndex = deleteList.findIndex(item => item.id === action.payload)
            deleteList.splice(goodsIndex, 1)
            return deleteList;

        default:
            return state;
    }
}