import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsSelection from './products-selection';
import Dropdown from './dropdown';

class Navigation extends React.Component {
    static propTypes = {
        onToggleType: PropTypes.func.isRequired,
        types: PropTypes.arrayOf(PropTypes.object).isRequired,
        onSortChange: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.handleSortChange('price');
    }

    handleSortChange = (sortingValue) => {
        this.props.onSortChange(sortingValue);
    }

    handleCheck = (event) => {
        this.props.onToggleType(event.target.value);
    }

    render() {
        const list = ['price', 'name'];

        return (
            <div className="navigation">
                <ProductsSelection
                    productTypes={this.props.types}
                    handleCheck={this.handleCheck}
                />
                <div className="products-sorting">
                    <h2>sort by</h2>
                    <Dropdown items={list} cb={this.handleSortChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    types: state.productType,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onToggleType: (typeName) => {
            dispatch({
                type: 'TOGGLE_TYPE',
                payload: typeName,
            });
        },
        onSortChange: (sortingValue) => {
            dispatch({
                type: 'SORT_PRODUCTS',
                payload: sortingValue,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
