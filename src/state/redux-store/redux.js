import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { compose } from 'redux';
import videoRetreatBookData from '../features/videoRetreatBookData/reducer';

let reducers = combineReducers({
  videoRetreatData: videoRetreatBookData,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleWare))); // это для использования extension'а redux dev tools в Google Chrome

export default store;
