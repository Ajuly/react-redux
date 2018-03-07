import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "./redux";

const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// state是状态树，可以是任意的结构
// action 是一个纯对象 {type : INCREASE}
let reducer = (state = { number: 0 }, action) => {
  if (action === undefined) return state;
  switch (action.type) {
    case "INCREASE":
      return { number: state.number + action.amount };
    case "DECREASE":
      return { number: state.number - action.amount };
    default:
      return state;
  }
};

let store = createStore(reducer);

// actionCreater
let increase = (amount) => ({ type: INCREASE, amount });
let decrease = (amount) => ({ type: DECREASE, amount })



let render = () => {
  ReactDOM.render(<Counter />, document.querySelector("#root"));
};

render();


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

 */
