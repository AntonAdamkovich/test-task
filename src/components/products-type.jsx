import React from 'react';
import PropTypes from 'prop-types';
import Product from './product';

export default function ProductsType({ name, products = [], visible }) {
    return (
        <div className={`products-type ${visible ? '' : 'hidden'}`}>
            <header>
                <h2>{name}</h2>
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
                    <li key={item.name}>
                        <Product
                            price={item.price}
                            name={item.name}
                            colors={item.colors}
                            sizes={item.sizes}
                            imageURL={item.imageURL}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

ProductsType.propTypes = {
    name: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    visible: PropTypes.bool.isRequired,
};
