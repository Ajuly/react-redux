import {ADD_TODO,DELETE_TODO} from '../actions';

let reducer = (state={list:[]},action) => {
    if(action === undefined) return state;
    switch (action.type) {
        case ADD_TODO:
            return {list:[...state.list,action.text]} // 先结构再合并
        case DELETE_TODO:
            let list = state.list;
            list.splice(action.index);
            // 我们的状态具有不变性，每次都要返回一个新的对象
            return {list:[...list]} // 先结构再合并
        default:
            return state;
    }

}

export default reducer;