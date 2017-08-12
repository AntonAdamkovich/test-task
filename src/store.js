import { createStore, combineReducers } from 'redux';
import productsTypeReducer from './reducers/products-type-reducer';

const store = createStore(productsTypeReducer);

export default store;
