// import React from "react";
// import ReactDOM from "react-dom";
import { createStore } from "./redux";

import $ from "jquery";

const INCREASE = "INCREASE";
const DECREASE = "DECREASE";


$("body").append(`
    <p id="counter">123</p>
    <button id="increasBtn">+</button>
    <button id="decreasBtn">-</button>
`);

// state是状态树，可以是任意的结构
// action 是一个纯对象 {type : INCREASE}
let reducer = (state = { number: 0 }, action) => {
  if(action === undefined) return state;
  switch (action.type) {
    case "INCREASE":
      return { number: state.number + action.amount };
    case "DECREASE":
      return { number: state.number - action.amount };
    default:
      return state;
  }
};

let store = createStore(reducer); // getState subscribe dispatch

// console.log(store.getState()) // undefined  原因只有调用了dispatch才可以

let render = () =>{
    // store.getState() 获取初始值
    $("#counter").html(store.getState().number);
}

// 订阅：当仓库里的state发生变化的时候，会重新执行render
store.subscribe(render);

$("#increasBtn").click(() => store.dispatch({type:INCREASE,amount:3}));
$("#decreasBtn").click(() => store.dispatch({type:DECREASE,amount:2}));

render();