import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductDetails({ name, imageURL }) {
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
                    <p className="details">
                        <img src={imageURL} alt="product" />
                    </p>
                </div>
            </div>
        </main>
    );
}
const mapStateToProps = (state, ownProps) => {
    const type = state.productType.find(item => item.name === ownProps.match.params.type);
    const productName = type.products.find(item => item.name === ownProps.match.params.name);

    return {
        product: productName,
    };
};

export default connect(mapStateToProps)(ProductDetails);
