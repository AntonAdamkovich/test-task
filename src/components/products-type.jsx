import React from 'react';
import PropTypes from 'prop-types';
import Product from './product';

export default function ProductsType({ type, products = [] }) {
    return (
        <div className="products-type">
            <header>
                <h2>{type}</h2>
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
                {products.map(item => (
                    <li>
                        <Product
                            price={item.price}
                            name={item.name}
                            colors={item.colors}
                            sizes={item.sizes}
                            key={item.name}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

ProductsType.propTypes = {
    type: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
