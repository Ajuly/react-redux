import counter from './reducers/counter'; // reducer
import {createStore} from 'redux';


let store = createStore(counter);
export default store;