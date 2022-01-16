import {combineReducers} from 'redux'

import userReducer from './reducer/auth'
import conversationReducer from './reducer/conversation'


////===========basic type===========
// const initState = {}

// const rootReducer = (state = initState, action) => {
//     return {
//         productList: productReducer(state.productList, action),
//         user: userReducer(state.user, action)
//     }
// }


////===========use combineReducer===========
const rootReducer = combineReducers({
    user: userReducer, 
    conversation: conversationReducer
})
export default rootReducer