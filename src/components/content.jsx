import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductsType from './products-type';

function Content({ types }) {
    return (
        <div className="content">
            {types.map(type => (
                <ProductsType
                    name={type.name}
                    products={type.products}
                    visible={type.visible}
                    key={type.name}
                />
            ))}
        </div>
    );
}

Content.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
    return {
        types: state.productType,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
