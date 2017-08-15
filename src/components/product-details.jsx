import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductDetails({ name, imageURL, price, colors, sizes }) {
    // TODO: FIX PATHS TO IMAGES
    return (
        <main>
            <div className="navigation">
                <div className="products-selection-bg-color">
                    <div className="products-selection">
                        <Link to="/">Back to catalog</Link>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="products-type">
                    <header>
                        <h2>{name}</h2>
                        <div />
                    </header>
                    <section className="product product-details">
                        <p className="details">
                            <img src={imageURL} alt="product" />
                        </p>
                        <ul>
                            <li>
                                <span className="product-price">{price.toPrecision(3).toString().replace('.', ',')}</span>
                                 price
                            </li>
                            <li>
                                <span>{colors.toString()}</span>
                                 colors
                            </li>
                            <li>
                                <span>{sizes.toString()}</span>
                                sizes
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}

ProductDetails.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageURL: PropTypes.string.isRequired,
};

ProductDetails.defaultProps = {
    imageURL: 'https://dummyimage.com/175x215.png?text=placeholder',
};

const mapStateToProps = (state, ownProps) => {
    const type = state.productType.find(item => item.name === ownProps.match.params.type);
    const productName = type.products.find(item => item.name === ownProps.match.params.name);

    return productName;
};

export default connect(mapStateToProps)(ProductDetails);
