import React from "react";
import {store} from '../store';

import {INCREASE,DECREASE} from '../actions';

let increase = amount => ({ type: INCREASE, amount });
let decrease = amount => ({ type: DECREASE, amount });


// 计数器组件
export default class Counter extends React.Component {
  constructor() {
    super();
    this.state = { number: store.getState().counter.number };
  }

  // 订阅
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState().counter.number
      });
    });
  }

  // 取消订阅
  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <p>{store.getState().counter.number}</p>
        <button id="increasBtn" onClick={() => store.dispatch(increase(2))}>
          +
        </button>
        <button id="decreasBtn" onClick={() => store.dispatch(decrease(2))}>
          -
        </button>
      </div>
    );
  }
}
