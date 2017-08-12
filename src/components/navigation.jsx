import React from 'react';
import { connect } from 'react-redux';
import ProductsSelection from './products-selection';
import Dropdown from './dropdown';

class Navigation extends React.Component {
    handleCheck = (event) => {
        if (event.target.checked === true) {
            this.props.onAddType(event.target.value);
        } else {
            this.props.onRemoveType(event.target.value);
        }
    }

    render() {
        const list = ['price', 'name'];
        const func = () => {};

        return (
            <div className="navigation">
                <ProductsSelection handleCheck={this.handleCheck} />
                <div className="products-sorting">
                    <h2>sort by</h2>
                    <Dropdown items={list} cb={func} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddType: (typeName) => {
            dispatch({
                type: 'ADD_TYPE',
                payload: typeName,
            });
        },
        onRemoveType: (typeName) => {
            dispatch({
                type: 'REMOVE_TYPE',
                payload: typeName,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
