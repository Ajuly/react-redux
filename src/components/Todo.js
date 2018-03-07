import React, { Component } from 'react'
import {store} from '../store';

import {ADD_TODO,DELETE_TODO} from '../actions';

export default class Todo extends Component {
      
  constructor(props){
      super(props);
      this.state = {list:store.getState().todo.list};
  }

  handleKeyDown = (event) => {
      if(event.keyCode === 13 && event.target.value.length > 0){
        //   let list = this.state.list;
        //   list.push(event.target.value);
        //   this.setState({list});
        //   event.target.value = "";
        store.dispatch({
            type:ADD_TODO,
            text:event.target.value
        })
        event.target.value = "";
      }
  }

  deleteTodo = (index) =>{
    store.dispatch({
        type:DELETE_TODO,
        index
    })
  }

  componentWillMount(){
      this.unSubscribe = store.subscribe(() => {
          this.setState({
              list:store.getState().todo.list
          })
      })
  }

  componentWillUnmount(){
      this.unSubscribe();
  }


  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown}/>
        <ul>
            { 
              this.state.list.map((todo,index) => (<li key={index}>{todo}<button onClick={() => this.deleteTodo(index)}>-</button></li>))
            }
        </ul>
      </div>
    )
  }
}


/**
 * 1.reducer
 * 2.let store = createStore(reducer);
 * 3.获取初始的值  store.getState().list
 * 4.增加/删除 store.dispatch({type:xx})
 * 5.订阅
 */