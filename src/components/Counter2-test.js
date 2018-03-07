import React, { Component } from 'react';
import {createStore} from '../redux';
import counter from '../reducers/counter';

let store = createStore(counter);



export default class Counter2 extends Component {
  constructor(){
    super();
    // 其实就是建立了从  store中state对象 到 当前 组件状态对象的映射
    this.state = {number:store.getState().number}
  }

  
  componentWillMount() {
      this.unsubscribe = store.subscribe(() =>{
         this.setState({
            number:store.getState().number
         })
      })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button>+</button>
        <button>-</button>
      </div>
    )
  }
}

/**
 * 太多重复的代码，需要自动生成
 */