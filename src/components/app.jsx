import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import Main from './main';
import ProductDetails from './product-details';

export default function App() {
    return (
        <div>
            <Header />
            <Route exact path="/" component={Main} />
            <Route path="/details/:type/:name" component={ProductDetails} />
        </div>
    );
}
