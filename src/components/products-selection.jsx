import React from 'react';
import PropTypes from 'prop-types';

export default function ProductsSorting({ handleCheck }) {
    return (
        <div className="products-selection-bg-color">
            <div className="products-selection">
                <form>
                    <div>
                        <input
                            type="checkbox"
                            name="products-type"
                            value="men"
                            defaultChecked
                            onChange={handleCheck}
                        />
                        <label>men</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="products-type"
                            value="woman"
                            defaultChecked
                            onChange={handleCheck}
                        />
                        <label>women</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="products-type"
                            value="children"
                            defaultChecked
                            onChange={handleCheck}
                        />
                        <label>children</label>
                    </div>
                </form>
                <button>see all products</button>
            </div>
        </div>
    );
}

ProductsSorting.propTypes = {
    handleCheck: PropTypes.func.isRequired,
};
