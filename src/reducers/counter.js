import {INCREASE,DECREASE} from '../actions';

// state是状态树，可以是任意的结构
// action 是一个纯对象 {type : INCREASE}
let reducer = (state = { number: 0 }, action) => {
    if (action === undefined) return state;
  
    switch (action.type) {
      case INCREASE:
        return { number: state.number + action.amount };
      case DECREASE:
        return { number: state.number - action.amount };
      default:
        return state;
    }
  };

  export default reducer;