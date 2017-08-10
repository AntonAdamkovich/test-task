import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './dropdown';

export default function Product({ name, price, description, colors, sizes, imageURL }) {
    // <span className="product-description">{description}</span>
    return (
        <section className="product">
            <header className="product-header">
                <Dropdown items={['m', 'l', 's']} cb={() => 1} defaultHeader={'size'} />

            </header>
            <p>
                <img src={imageURL} alt="product" />
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
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string,
    imageURL: PropTypes.string,
};

Product.defaultProps = {
    imageURL: 'https://dummyimage.com/175x215.png?text=placeholder',
    name: 't-shirt',
    price: '5',
    description: 'product',
    colors: ['red', 'white'],
    sizes: ['l', 'm'],
};
