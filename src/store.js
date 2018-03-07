import { createStore } from "./redux";

/**
 * 旧的状态 {number:0} {list:[]}
 * 新的状态 {counter:{number:0},todo:{list:[]}}
 */
import counter from "./reducers/counter"
import todo from "./reducers/todo"

import combineReducers from "./combineReducers"


let reducer = combineReducers({
    counter,
    todo
})

// 返回新的reducer {counter:{number:0},todo:{list:[]}}

let store = createStore(reducer);

export {store};


/**
 * 对象的的键和值变量相等可以进行省略
    let reducer = combineReducers({
        counter:counter,
        todo:todo
    })
 */

 /**
  * 1.把store提出来store.js 
  *     1.将reducers拆分开 reducers/counter.js  reducers/todo.js 
  *     2.combineReducers 合并reducer  combineReducers会返回一个新的reducer
  * 
  */
