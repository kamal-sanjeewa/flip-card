import {combineReducers} from 'redux';
import cardDeckReducer from './cardDeckReducer';
import stepCounterReducer from './stepCountReducer';

const rootReducer = combineReducers({
  stepCounterReducer: stepCounterReducer,
  cardDeckReducer: cardDeckReducer,
});
export default rootReducer;

export type ApplicationState = ReturnType<typeof rootReducer>;
