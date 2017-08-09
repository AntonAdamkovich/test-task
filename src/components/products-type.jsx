import React from 'react';
import Product from './product';

export default function ProductsType() {
    return (
        <div className="products-type">
            <header>
                <h2>{'men'}</h2>
                <div></div>
            </header>
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
