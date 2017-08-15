import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ProductsType from './products-type';

class Content extends React.Component {
    state = {
        containerWidth: 0,
        itemWidth: 0,

        itemsPerPage: 0,
        currentPage: 0,
        startItemIndex: 0,
        endItemIndex: 3,
        pagesCount: 0,
    }

    componentDidMount() {
        const currentSizes = this.getSizes();

        const containerWidth = currentSizes.containerWidth;
        const itemWidth = currentSizes.itemWidth;
        const itemsPerPage = this.visibleItemsCount(containerWidth, itemWidth);
        const currentPage = 0;
        const startItemIndex = currentPage * itemsPerPage;
        const endItemIndex = startItemIndex + itemsPerPage;
        const pagesCount = _.ceil(this.props.types[0].products.length / itemsPerPage);

        this.setState(() => ({
            containerWidth,
            itemWidth,

            itemsPerPage,
            currentPage,
            startItemIndex,
            endItemIndex,
            pagesCount,
        }));

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    getSizes() {
        const containerWidth = parseFloat(
            getComputedStyle(this.container).width,
        );
        const itemWidth = parseFloat(
            getComputedStyle(this.container.children[0].querySelectorAll('ul li')[0]).width,
        );

        // console.log(`width: ${containerWidth}, ${itemWidth}`);
        return {
            containerWidth,
            itemWidth,
        };
    }

    visibleItemsCount(containerWidth, itemWidth) {
        const gapBetweenItems = (itemWidth * 0.1);
        let itemsCount = _.floor(containerWidth / (itemWidth + gapBetweenItems));
        if (itemsCount < 1) {
            itemsCount = 1;
        }

        return itemsCount;
    }

    handleResize = (event) => {
        const currentSizes = this.getSizes();
        const currentItemsCount = this.visibleItemsCount(currentSizes.containerWidth, currentSizes.itemWidth);

        if (this.state.itemsPerPage !== currentItemsCount) {
            // currentPage, itemsPerPage, startItem, endItem, pagesCount
            this.setState(() => ({
                containerWidth: currentSizes.containerWidth,
                itemsPerPage: currentItemsCount,
            }));

            // this.props.onResize(currentItemsCount, this.currentPage, this.);
        }
    }

    handleControlsClick = (event) => {
        event.preventDefault();
        let currentPage;
        let newStartItemIndex;
        let newEndItemIndex;

        if (event.target.matches('.previous-page')) {
            currentPage = this.state.currentPage - 1;
            newEndItemIndex = this.state.startItemIndex - 1;
            newStartItemIndex = newEndItemIndex - this.state.itemsPerPage;
            if (newStartItemIndex < 0) {
                newEndItemIndex = (this.state.pagesCount * this.state.itemsPerPage) + 1;
                newStartItemIndex = newEndItemIndex - this.state.itemsPerPage;
                currentPage = this.state.pagesCount;
            }

            this.setState(() => ({
                currentPage,
                startItemIndex: newStartItemIndex,
                endItemIndex: newEndItemIndex,
            }));
        } else if (event.target.matches('.next-page')) {
            currentPage = this.state.currentPage + 1;
            newStartItemIndex = this.state.endItemIndex + 1;
            newEndItemIndex = newStartItemIndex + this.state.itemsPerPage;
            // this.props.onNextClick(target, currentPage, itemsPerPage);
            if (newStartItemIndex > this.state.itemsPerPage * this.state.pagesCount) {
                newStartItemIndex = 0;
                newEndItemIndex = newStartItemIndex + this.state.itemsPerPage;
                currentPage = 0;
            }

            this.setState(() => ({
                currentPage,
                startItemIndex: newStartItemIndex,
                endItemIndex: newEndItemIndex,
            }));
        }
    }

    sortVisible(products = []) {
        return products.map((item, index) => {
            if (index < this.state.startItemIndex || index > this.state.endItemIndex) {
                return _.set(item, 'visible', false);
            }
            return _.set(item, 'visible', true);
        });
    }

    render() {
        return (
            <div
                className="content"
                ref={(item) => { this.container = item; }}
            >
                {this.props.types.map(type => (
                    <ProductsType
                        name={type.name}
                        products={this.sortVisible(type.products)}
                        visible={type.visible}
                        clickHandler={this.handleControlsClick}
                        key={type.name}
                    />
                ))}
            </div>
        );
    }
}

Content.propTypes = {
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
    return {
        types: state.productType,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMount: () => {
            dispatch({
                type: 'SLIDER_ACTION',
                payload: 'INIT',
            });
        },
        onResize: () => {
            dispatch({
                type: 'SLIDER_ACTION',
                payload: 'RESIZE',
            });
        },
        onNextClick: () => {
            dispatch({
                type: 'SLIDER_ACTION',
                payload: 'NEXT',
            });
        },
        onPreviousClick: () => {
            dispatch({
                type: 'SLIDER_ACTION',
                payload: 'PREVIOUS',
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);


/*

this.itemsPerPage = this.visibleItemsCount();
        this.pagesCount = _.round(this.props.products.length / this.itemsPerPage);
        // this.startItem = this.currentPage * this.itemsPerPage;
        // this.endItem = this.startItem + this.itemsPerPage;

    handleControlsClick = (event) => {
        event.preventDefault();

        if (event.target.matches('.previous-page')) {
            console.log('previous');
        } else if (event.target.matches('.next-page')) {
            console.log('next');
        }
    }


    isVisible(index) {
        const currentIndex = index + 1;
        if (currentIndex < this.startItem || currentIndex > this.endItem) {
            return ' hidden';
        }
        return null;
    }

    visibleItemsCount() {
        const gapBetweenItems = (this.itemWidth * 0.05);
        let itemsCount = _.floor(this.containerWidth / (this.itemWidth + gapBetweenItems));
        if (itemsCount < 1) {
            itemsCount = 1;
        }
        return itemsCount;
    } */
