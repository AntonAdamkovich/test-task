import React from 'react';
import PropTypes from 'prop-types';

export default function ProductsSelection({ handleCheck, productTypes }) {
    return (
        <div className="products-selection-bg-color">
            <div className="products-selection">
                <form>
                    {productTypes.map(item => (
                        <div key={item.name}>
                            <input
                                type="checkbox"
                                name="products-type"
                                value={item.name}
                                defaultChecked={item.visible}
                                onChange={handleCheck}
                            />
                            <label>{item.name}</label>
                        </div>
                    ))}
                </form>
                <button>see all products</button>
            </div>
        </div>
    );
}

ProductsSelection.propTypes = {
    handleCheck: PropTypes.func.isRequired,
    productTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
