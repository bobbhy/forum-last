import counterReducer from '../reducers/counter/counterSlice';
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  counter: counterReducer
})
export default allReducers;
