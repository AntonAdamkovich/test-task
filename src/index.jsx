import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store';
import exampleData from './example-data';

import '../public/sass/main.scss';

const rootElement = document.querySelector('#root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement,
);
