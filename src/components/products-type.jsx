import React from 'react';
import Product from './product';

export default function ProductsType() {
    return (
        <div className="products-type">
            <header>
                <h2>{'men'}</h2>
                <div />
            </header>
            <div className="products-type-controls">
                <p>
                    <span className="current-page">1</span>
                    /
                    <span className="total-pages">5</span>
                </p>
                <p>
                    <a href="#" className="previous-page">&lt;</a>
                    <a href="#" className="next-page">&gt;</a>
                </p>
            </div>
            <ul>
                <li>
                    <Product price={5} name={'t-shirt'} colors={['red', 'white']} sizes={['l', 'm']} />
                </li>
                <li>
                    <Product price={5} name={'t-shirt'} colors={['red', 'white']} sizes={['l', 'm']} />
                </li>
                <li>
                    <Product price={5} name={'t-shirt'} colors={['red', 'white']} sizes={['l', 'm']} />
                </li>
            </ul>
        </div>
    );
}
