import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import App from './components/app';
import store from './store';

import '../public/sass/main.scss';

const rootElement = document.querySelector('#root');
const syncHistory = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={syncHistory}>
            <App />
        </Router>
    </Provider>,
    rootElement,
);
