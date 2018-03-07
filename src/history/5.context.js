import React from "react";
import ReactDOM from "react-dom";
import {PropTypes} from "prop-types";

class Container extends React.Component {
  getChildContext(){
      // 返回一个对象，这个对象就是子组件的context对象
      return {color:'red'}
  }
  render() {
    console.log(color); // blue
    return <MessageList color={color} message={this.props.message} />;
  }
}

// 定义子组件的上下文对象childContextTypes
Container.childContextTypes={
    color:PropTypes.string
}

class MessageList extends React.Component {
  render() {
    console.log("color"+color)
    return (
      <ul>
        {this.props.message.map((message, index) => (
          <Message key={index} message={message} color={color}/>
        ))}
      </ul>
    );
  }
}

class Message extends React.Component {
  render() {
    console.log(this.context.color); // red
    return <li style={{color:this.context.color}}>{this.props.message}</li>;
  }
}

Message.contextTypes = {
    color:PropTypes.string
}

let message = [1, 2, 3];
let color='blue';

ReactDOM.render(
  <Container message={message} color={color} />,
  document.querySelector("#root")
);

/**
 * 1.组件的嵌套
 * 2.从最外层组建向内部传参数  逐级的传递  很麻烦
 * 3.怎样进行改善
 * ·顶层组件 getChildContext  childContextTypes  属性不需要再逐级的传递
 * ·需要接收属性的组件  contextTypes   获取上下文属性 this.context.color
 * 
 * 这个方法的缺点：不稳定
 * 
 */


