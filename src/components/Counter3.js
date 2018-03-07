import React, { Component } from 'react';
import {INCREASE,DECREASE} from '../actions';
import {connect} from 'react-redux';


// UI组件
class Counter2 extends Component {
  render() {
    return (
      <div>
        <p>{this.props.value}</p>
        <button onClick={this.props.onIncrease}>+</button>
        <button onClick={this.props.onDecrease}>-</button>
      </div>
    )
  }
}

// mapStateToProps : 把store里的状态对象映射成属性 
let mapStateToProps = (state) =>(
    {
        value:state.number
    }
)

// mapDispatchToProps : 把 dispatch方法 映射成 UI组件的 属性 
let mapDispatchToProps = (dispatch) =>(
    {
        onIncrease:() => dispatch({type:INCREASE,amount:2}),
        onDecrease:() => dispatch({type:DECREASE,amount:3})
    }
)



export default connect(mapStateToProps,mapDispatchToProps)(Counter2)