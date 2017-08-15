import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Product from './product';

export default function ProductsType({ name, products, visible, clickHandler, currentPage, totalPages}) {
    return (
        <div className={`products-type ${visible ? '' : 'hidden'}`}>
            <header>
                <h2>{name}</h2>
                <div />
            </header>
            <div className="products-type-controls">
                <p>
                    <span className="current-page">{currentPage}</span>
                    /
                    <span className="total-pages">{totalPages}</span>
                </p>
                <p onClick={clickHandler}>
                    <a href="#" className="previous-page">&lt;</a>
                    <a href="#" className="next-page">&gt;</a>
                </p>
            </div>
            <ul>
                {products.filter(item => item.visible === true)
                    .map(item => (
                        <li key={item.name}>
                            <Link to={`/details/${name}/${item.name}`}>
                                <Product
                                    price={item.price}
                                    name={item.name}
                                    colors={item.colors}
                                    sizes={item.sizes}
                                    imageURL={item.imageURL}
                                />
                            </Link>
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
    clickHandler: PropTypes.func.isRequired,
};

