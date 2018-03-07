import React from 'react';
import ReactDOM from 'react-dom';

import Counter2 from './components/Counter3';
import { Provider } from 'react-redux';

import store from './store2';



ReactDOM.render(
    <Provider store={store}>
        <Counter2/>
    </Provider>
    , document.querySelector('#root'));