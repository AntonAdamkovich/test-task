import React from 'react';
import PropTypes from 'prop-types';

export default function Product({ name, price, description, colors, sizes, imageLink }) {
    return (
        <section className="product">
            <header className="product-header">
                <span className="description">{description}</span>
            </header>
            <p>
                <img src={imageLink} alt="product" />
            </p>
            <footer>
                <span className="product-name">{name}</span>
                <span className="product-price">{price.toPrecision(3).toString().replace('.', ',')}</span>
            </footer>
        </section>
    );
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string,
    imageLink: PropTypes.string,
};

Product.defaultProps = {
    imageLink: 'https://dummyimage.com/175x215.png?text=placeholder',
    name: 't-shirt',
    price: '5',
    description: 'product',
    colors: ['red', 'white'],
    sizes: ['l', 'm'],
};
