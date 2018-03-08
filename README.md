# redux学习
## 1. Redux应用场景
随着 JavaScript 单页应用开发日趋复杂,管理不断变化的 state 非常困难.**Redux的出现就是为了解决state里的数据问题**。 
在React中，数据在组件中是单向流动的。数据从一个方向父组件流向子组件(通过props)，由于这个特征，两个非父子关系的组件（或者称作兄弟组件）之间的通信就比较麻烦。 

![](https://ws3.sinaimg.cn/large/006tNc79ly1fp57swsv3wj30hp093q47.jpg)


## 2. Redux设计思想
Redux是将整个应用状态存储到到一个地方，称为store,，里面保存一棵状态树(state tree)。 组件可以派发(dispatch)行为(action)给store,而不是直接通知其它组件。 组件内部通过订阅store中的状态(state)来刷新自己的视图. 


![](https://ws1.sinaimg.cn/large/006tNc79ly1fp57tifvu3j30kp0atgmx.jpg)

## 3. Redux三大原则
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于**唯一一个 store**中
State 是只读的，**惟一改变 state 的方法就是触发 action**，action 是一个用于描述已发生事件的普通对象
使用纯函数来执行修改，为了描述action如何改变state tree ，你需要编写 reducers
单一数据源的设计让React的组件之间的通信更加方便，同时也便于状态的统一管理
## 4. Redux概念解析
### 4.1 Store
Store 就是**保存数据的地方**，你可以把它看成一个容器。整个应用只能有一个 Store。
Redux 提供createStore这个函数，用来生成Store。

    import { createStore } from 'redux';
    const store = createStore(fn);
        
上面代码中，createStore函数接受另一个函数作为参数，返回新生成的Store对象。
### 4.2 State

Store对象包含所有数据。如果想得到某个时点的数据，就要对Store生成快照。这种时间点的数据集合，就叫做State。 当前时刻的State，可以通过store.getState()拿到。

        import { createStore } from 'redux';
        const store = createStore(fn);
        const state = store.getState();
    
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

### 4.3 Action
State的变化，会导致View的变化。但是，用户接触不到 State，只能接触到View。所以，State的变化必须是 View导致的。Action 就是 View 发出的通知，表示State 应该要发生变化了。 Action是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。

    const action = {
      type: 'ADD_TODO',
      payload: '学习redux'
    };

上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串学习redux。 可以这样理解，Action描述当前发生的事情。改变State的唯一办法，就是使用 Action。它会运送数据到 Store。

### 4.4 Action Creator
View要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

    const ADD_TODO = '添加 TODO';
    function addTodo(text) {
      return {
        type: ADD_TODO,
        text
      }
    }

const action = addTodo('学习Redux');
上面代码中，addTodo函数就是一个 Action Creator。

### 4.5 store.dispatch()
store.dispatch()是 View 发出 Action 的唯一方法。

    import { createStore } from 'redux';
    const store = createStore(fn);
    
    store.dispatch({
      type: 'ADD_TODO',
      payload: '学习Redux'
    });
    
上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。 结合 Action Creator，这段代码可以改写如下。

store.dispatch(addTodo('学习Redux'))
### 4.6 Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。 Reducer 是一个纯函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

    const reducer = function (state, action) {
      // ...
      return new_state;
    };
## 5. redux源码
    const createStore = (reducer) => {
      let state;
      let listeners = [];
    
      const getState = () => state;
    
      const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
      };
    
      const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter(l => l !== listener);
        }
      };
    
      dispatch({});
    
      return { getState, dispatch, subscribe };
    };
    
## 6. 案例
### 6.1 原生计数器
html代码

    <div id="counter"></div>
      <button id="addBtn">+</button>
      <button id="minusBtn">-</button>
    js代码
    
    function createStore(reducer) {
        var state;
        var listeners = [];
        var getState = () => state;
        var dispatch = (action) => {
            state = reducer(state, action);
            listeners.forEach(l=>l());
        }
        var subscribe = (listener) => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter((l) => l != listener)
            }
        }
        dispatch();
        return {
            getState, dispatch, subscribe
        }
    }
    var reducer = (state = 0, action) => {
        if (!action) return state;
        console.log(action);
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
            default:
                return state;
        }
    }
    var store = createStore(reducer);
    store.subscribe(function () {
        document.querySelector('#counter').innerHTML = store.getState();
    });
    
    document.querySelector('#addBtn').addEventListener('click', function () {
        store.dispatch({type: 'INCREMENT'});
    });
    document.querySelector('#minusBtn').addEventListener('click', function () {
        store.dispatch({type: 'DECREMENT'});
    });
### 6.2 redux计数器
    import {createStore} from 'redux';
### 6.3 react组件计数器
    html代码
    
    <div id="counter"></div>
    import React, {Component} from 'react';
    import ReactDOM from 'react-dom';
    import {createStore} from 'redux';
    class Counter extends React.Component {
        render() {
            return (
                <div>
                    <h1>{this.props.value}</h1>
                    <button onClick={this.props.onIncrement}>+</button>
                    <button onClick={this.props.onDecrement}>-</button>
                </div>
            )
        }
    }
    const reducer = (state = 0, action) => {
            switch (action.type) {
                case 'INCREMENT':
                    return state + 1;
                case 'DECREMENT':
                    return state - 1;
                default:
                    return state;
            }
        };
    
    const store = createStore(reducer);
    
    const render = () => {
            ReactDOM.render(
                <Counter
                    value={store.getState()}
                    onIncrement={() => store.dispatch({type: 'INCREMENT'})}
                    onDecrement={() => store.dispatch({type: 'DECREMENT'})}
                />,
                document.getElementById('counter')
            );
        };
    
    render();
    
    store.subscribe(render);

### 7. combineReducers

    function createStore(reducer) {
        var state;
        var listeners = [];
        var getState = () => state;
        var dispatch = (action) => {
            state = reducer(state, action);
            listeners.forEach(l => l());
        }
        var subscribe = (listener) => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter((l) => l != listener)
            }
        }
        dispatch();
        return {
            getState, dispatch, subscribe
        }
    }
    var hour = (state = 0, action) => {
        if (!action) return state;
        if (action.type == 'HOUR') {
            return state + 1;
        }
        return state;
    }
    var minute = (state = 0, action) => {
        if (!action) return state;
        if (action.type == 'MINUTE') {
            return state + 1;
        }
        return state;
    }
    var second = (state = 0, action) => {
        if (!action) return state;
        if (action.type == 'SECOND') {
            return state + 1;
        }
        return state;
    }
    function combineReducers(reducers) {
        return function (state = {}, action) {
            return Object.keys(reducers).reduce((curr, key) => {
                curr[key] = reducers[key](state[key], action);
                return curr;
            }, {});
        }
    }
    var reducer = combineReducers({
        hour, minute, second
    });
    
    var store = createStore(reducer);
    store.subscribe(function () {
        var state = store.getState();
        document.querySelector('#hour').innerHTML = state.hour;
        document.querySelector('#minute').innerHTML = state.minute;
        document.querySelector('#second').innerHTML = state.second;
    });
    
    document.querySelector('#hourBtn').addEventListener('click', function () {
        store.dispatch({type: 'HOUR'});
    });
    document.querySelector('#minuteBtn').addEventListener('click', function () {
        store.dispatch({type: 'MINUTE'});
    });
    document.querySelector('#secondBtn').addEventListener('click', function () {
        store.dispatch({type: 'SECOND'});
    });
    import {createStore, combineReducers} from 'redux';
    var hour = (state, action) => {
        if (action.type == 'HOUR') {
            return state + 1;
        }
        return state;
    }
    var minute = (state, action) => {
        if (action.type == 'MINUTE') {
            return state + 1;
        }
        return state;
    }
    var second = (state, action) => {
        if (action.type == 'SECOND') {
            return state + 1;
        }
        return state;
    }
    var reducer = combineReducers({
        hour,
        minute,
        second
    });

## 8. react-redux
### 8.1 UI 组件
React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。 UI 组件有以下几个特征。

    只负责 UI 的呈现，不带有任何业务逻辑
    没有状态（即不使用this.state这个变量）
    所有数据都由参数（this.props）提供
    不使用任何 Redux 的 API
    
下面就是一个 UI 组件的例子。

    const Title =
      value => <h1>{value}</h1>;
      
因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

### 8.2 容器组件

容器组件的特征恰恰相反。

    负责管理数据和业务逻辑，不负责 UI 的呈现
    带有内部状态
    使用 Redux 的 API 
    
总之，只要记住一句话就可以了：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

你可能会问，如果一个组件既有 UI 又有业务逻辑，那怎么办？
回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。
前者负责与外部的通信，将数据传给后者，由后者渲染出视图。 React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

### 8.3 connect()

React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。

    import { connect } from 'react-redux'
    const App = connect()(Counter)
    
上面代码中，Counter是 UI 组件，CounterApp就是由 React-Redux 通过connect方法自动生成的容器组件。 但是，因为没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个单纯的包装层。为了定义业务逻辑，需要给出下面两方面的信息。

（1）输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
（2）输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。
因此，connect方法的完整 API 如下。

    import { connect } from 'react-redux'
    
    const CounterApp = connect(
      mapStateToProps,
      mapDispatchToProps
    )(Counter)

上面代码中，connect方法接受两个参数：mapStateToProps和mapDispatchToProps。 它们定义了 UI 组件的业务逻辑。 前者负责输入逻辑，即将state映射到 UI 组件的参数（props） 后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

### 8.4 mapStateToProps()

mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。 作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。请看下面的例子。

    function mapStateToProps(state) {
      return {
        value: state.count
      }
    }
    
上面代码中，mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个value属性，代表 UI 组件的同名参数

mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。 mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。

使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。 connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。

### 8.5 mapDispatchToProps()

mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。

    function mapDispatchToProps(dispatch) {
      return {
        onIncreaseClick: () => dispatch(increaseAction)
      }
    }

从上面代码可以看到，mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。

### 8.6 组件

connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。 一种解决方法是将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将state传下去就很麻烦。 React-Redux 提供Provider组件，可以让容器组件拿到state。

    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
    import counter from './reducers'
    import CounterApp from './components/CounterApp'
    
    let store = createStore(counter);
    
    render(
      <Provider store={store}>
        <CounterApp />
      </Provider>,
      document.getElementById('root')
    )
    上面代码中，Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。 它的原理是React组件的context属性，请看源码。
    
    class Provider extends Component {
      getChildContext() {
        return {
          store: this.props.store
        };
      }
      render() {
        return this.props.children;
      }
    }
    
    Provider.childContextTypes = {
      store: React.PropTypes.object
    }
    
上面代码中，store放在了上下文对象context上面。然后，子组件就可以从context拿到store，代码大致如下。

    import React from 'react';
    export function connect(mapStateToProps, mapDispatchToState) {
        return (component) => {
            class Proxy extends React.Component {
                constructor() {
                    super();
                    this.state = mapStateToProps(this.context.store.getState());
                }
    
                componentWillMount() {
                    this.unsubscribe = this.context.store.subscribe(() => {
                        this.setState({...mapStateToProps(this.context.store.getState())});
                    })
                }
    
                componentWillUnMount() {
                    this.unsubscribe();
                }
    
                return() {
                    return
                    <component {...this.state} {...mapDispatchToState(this.context.store.dispatch)}></component>
                }
            }
            return Proxy;
        }
    }
React-Redux自动生成的容器组件的代码，就类似上面这样，从而拿到store。

### 8.7 react-redux计数器

    class Counter extends Component {
      render() {
        const { value, onIncreaseClick } = this.props
        return (
          <div>
            <span>{value}</span>
            <button onClick={onIncreaseClick}>Increase</button>
          </div>
        )
      }
    }
    function mapStateToProps(state) {
      return {
        value: state.count
      }
    }
    const increaseAction = { type: 'increase' }
    
    function mapDispatchToProps(dispatch) {
      return {
        onIncreaseClick: () => dispatch(increaseAction)
      }
    }
    
    const CounterApp = connect(
      mapStateToProps,
      mapDispatchToProps
    )(Counter)
    // Reducer
    function counter(state = { count: 0 }, action) {
      const count = state.count
      switch (action.type) {
        case 'increase':
          return { count: count + 1 }
        default:
          return state
      }
    }
    
    const store = createStore(counter);
    
    ReactDOM.render(
      <Provider store={store}>
        <CounterApp />
      </Provider>,
      document.getElementById('root')
    );
    
    
### context

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
    
    
    
##     connect

**怎样取仓库store？只有一个仓库**
**解决：provider**

**Provider.js**

      import React from 'react';
      import {PropTypes} from 'prop-types';
        
        
      class Provider extends React.Component{
        
         getChildContext(){
           return {store:this.props.store};
         }
    
         render(){
           return this.props.children;  //  返回子组件
         }
       }
        
        Provider.childContextTypes={
            store:PropTypes.object
        }
        
        export default Provider;

  **index.js**
      
        import React from 'react';
        import ReactDOM from 'react-dom';
    
        import Provider from './components/Provider';
        import Counter2 from './components/Counter2';
    
        import {createStore} from './redux';
        import counter from './reducers/counter'; // reducer
    
        let store = createStore(counter)
    
        ReactDOM.render(
            <Provider store={store}>
                <Counter2/>
            </Provider>
            , document.querySelector('#root'));
            
            
**Counter2是UI组件** 经connect处理之后生成新的有状态的组件

    import React, { Component } from 'react';
    import {INCREASE,DECREASE} from '../actions';
    import connect from '../connect';
    
    
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
    
    
##     React-redux:使用系统库实现

    import {connect} from 'react-redux';
    
    import { Provider } from 'react-redux';
    
    import {createStore} from 'redux';
    
    以上都使用第三的类库进行实现
    
    
##     小理解：

    怎样实现多层级组件间的通信：
    1.状态提升
    2.订阅发布

    context上下文：
    举个例子，要过马路去某一个地方，你可能会有很多条路可以进行选择，这样的多选择就会造成紊乱，于是就出现了护栏，这就就规定了到达的方式，操作跟规范，redux就相当于这个护栏。
    
    provider 完全感受不到上下文  



