import React from 'react';
import ProductsSelection from './products-selection';
import Dropdown from './dropdown';

export default class Navigation extends React.Component {
    handleCheck = (event) => {

    }

    render() {
        const list = ['price', 'name'];
        const func = () => {};

        return (
            <div className="navigation">
                <ProductsSelection />
                <div className="products-sorting">
                    <h2>sort by</h2>
                    <Dropdown items={list} cb={func} />
                </div>
            </div>
        );
    }
}
