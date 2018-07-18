import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

let _compose = null;
if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined') {
	_compose = compose(applyMiddleware(...middleware));
} else {
	_compose = compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}

const store = createStore(rootReducer, initialState, _compose);

export default store;
