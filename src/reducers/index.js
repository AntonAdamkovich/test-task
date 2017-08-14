import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import productType from './products-type';


export default combineReducers({
    routing: routerReducer,
    productType,
});
