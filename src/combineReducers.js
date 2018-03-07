// 将两个reducer进行合并

let combineReducers = (reducers) => 
    (state={},action) =>{// 返回一个reducer
        let newState = {};
       
        for (var key in reducers) {
            newState[key] = reducers[key](state[key],action)
        }
        return newState;
    }

export default combineReducers;
