import React from "react";
import ReactDOM from "react-dom";

import Counter from './components/Counter'
import Todo from './components/Todo'

ReactDOM.render(<div>
    <Counter />
    <Todo />
</div>, document.querySelector("#root"));

/**
 * 1.尝试将订阅写在组建的内部
 * componentWillMount() {
      store.subscribe(() => {
         this.setState({
             number:store.getState().number
         })
      })
    }
 * 2.生命周期函数
 * componentWillMount   订阅
 *  // 订阅
    componentWillMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                number:store.getState().number
            })
        })
    }

    // 取消订阅
    componentWillUnMount(){
        this.unsubscribe();
    }
 * 3.点击的时候触发dispatch action
 * 4.如果需要两个组件那么两个store怎样进行处理
 *   单独建一个store.js文件
 *   import { createStore } from "../redux";
     let store = createStore(reducer);
     export {store};
 * 
 * 

 */