import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ProductsType from './products-type';

class Content extends React.Component {
    static propTypes = {
        types: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    state = {
        containerWidth: 0,
        itemWidth: 0,

        totalItemsCount: 0,
        itemsPerPage: 0,
        currentPage: 0,
        startItemIndex: 0,
        lastItemIndex: 0,
        pagesCount: 0,
    }

    componentDidMount() {
        const containerWidth = this.getContainerWidth();
        const itemWidth = this.getItemWidth();
        const itemsPerPage = this.visibleItemsCount(containerWidth, itemWidth);
        const currentPage = 0;
        const startItemIndex = currentPage * itemsPerPage;
        const lastItemIndex = startItemIndex + itemsPerPage;
        const totalItemsCount = this.props.types[0].products.length;
        const pagesCount = _.ceil(totalItemsCount / itemsPerPage);

        this.setState(() => ({
            containerWidth,
            itemWidth,

            itemsPerPage,
            currentPage,
            startItemIndex,
            lastItemIndex,
            totalItemsCount,
            pagesCount,
        }));

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    /**
     * return width of container of elements
     *
     * @returns {number}
     * @memberof Content
     */
    getContainerWidth() {
        const containerWidth = parseFloat(
            getComputedStyle(this.container).width,
        );

        return containerWidth;
    }

    /**
     * return width of a slider element li
     *
     * @returns {number}
     * @memberof Content
     */
    getItemWidth() {
        const itemWidth = parseFloat(
            getComputedStyle(this.container.children[0].querySelectorAll('ul li')[0]).width,
        );
        return itemWidth;
    }

    /**
     * return horizontal margins of a slider element li
     *
     * @returns {number}
     * @memberof Content
     */
    getHorizontalMargins() {
        const marginLeft = parseFloat(
            getComputedStyle(this.container.children[0].querySelectorAll('ul li')[0])['margin-left'],
        );
        const marginRight = parseFloat(
            getComputedStyle(this.container.children[0].querySelectorAll('ul li')[0])['margin-right'],
        );

        return {
            marginLeft,
            marginRight,
        };
    }

    visibleItemsCount(containerWidth, itemWidth) {
        const horizontalMargins = this.getHorizontalMargins();
        const gapAroundItem = (horizontalMargins.marginLeft + horizontalMargins.marginRight) || (itemWidth * 0.01);
        let itemsCount = _.floor(containerWidth / (itemWidth + gapAroundItem));
        if (itemsCount < 1) {
            itemsCount = 1;
        }

        return itemsCount;
    }

    /**
     * handle horizontal resize of window
     *
     * @memberof Content
     */
    handleResize = (event) => {
        const currentContainerSize = this.getContainerWidth();
        const currentItemsCount = this.visibleItemsCount(
            currentContainerSize,
            this.state.itemWidth,
        );
        let counter = Math.abs(currentItemsCount - this.state.itemsPerPage);

        // hide excess elements
        if (this.state.containerWidth < currentContainerSize && counter > 0) {
            let startItemIndex = this.state.startItemIndex;
            let lastItemIndex = this.state.lastItemIndex;

            while (counter > 0) {
                if (startItemIndex > 0) {
                    startItemIndex += 1;
                } else {
                    lastItemIndex += 1;
                }

                counter -= 1;
            }

            const currentPage = _.ceil(startItemIndex / currentItemsCount);

            this.setState(() => ({
                containerWidth: currentContainerSize,
                itemsPerPage: currentItemsCount,
                startItemIndex,
                lastItemIndex,
                currentPage,
            }));

            // show more elements
        } else if (this.state.containerWidth > currentContainerSize && counter > 0) {
            let startItemIndex = this.state.startItemIndex;
            let lastItemIndex = this.state.lastItemIndex;

            while (counter > 0) {
                if (startItemIndex > 0) {
                    startItemIndex += 1;
                } else {
                    lastItemIndex -= 1;
                }

                counter -= 1;
            }

            const currentPage = _.ceil(startItemIndex / currentItemsCount);

            this.setState(() => ({
                containerWidth: currentContainerSize,
                itemsPerPage: currentItemsCount,
                startItemIndex,
                lastItemIndex,
                currentPage,
            }));
        }
    }

    /**
     * handle click on slider controls
     *
     * @memberof Content
     */
    handleControlsClick = (event) => {
        event.preventDefault();
        let currentPage;
        let newStartItemIndex;
        let newLastItemIndex;

        if (event.target.matches('.previous-page')) {
            currentPage = this.state.currentPage - 1;
            newLastItemIndex = this.state.startItemIndex;
            newStartItemIndex = newLastItemIndex - this.state.itemsPerPage;
            if (newStartItemIndex < 0) {
                newLastItemIndex = _.ceil(this.state.totalItemsCount / this.state.itemsPerPage) * this.state.itemsPerPage;
                newStartItemIndex = newLastItemIndex - this.state.itemsPerPage;
                currentPage = this.state.pagesCount;
            }
            console.log(newLastItemIndex, newStartItemIndex, currentPage);

            this.setState(() => ({
                currentPage,
                startItemIndex: newStartItemIndex,
                lastItemIndex: newLastItemIndex,
            }));
        } else if (event.target.matches('.next-page')) {
            currentPage = this.state.currentPage + 1;
            newStartItemIndex = this.state.lastItemIndex;
            newLastItemIndex = newStartItemIndex + this.state.itemsPerPage;
            // this.props.onNextClick(target, startItemIndex, lastItemIndex, currentPage);
            if (newStartItemIndex >= this.state.totalItemsCount) {
                newStartItemIndex = 0;
                newLastItemIndex = newStartItemIndex + this.state.itemsPerPage;
                currentPage = 0;
            }

            this.setState(() => ({
                currentPage,
                startItemIndex: newStartItemIndex,
                lastItemIndex: newLastItemIndex,
            }));
        }
    }

    sortVisible(products = []) {
        let visibleElementsCount = 0;
        const result = products.map((item, index) => {
            if (index < this.state.startItemIndex || index >= this.state.lastItemIndex) {
                return _.set(item, 'visible', false);
            }
            visibleElementsCount += 1;
            return _.set(item, 'visible', true);
        });

        if (visibleElementsCount < 1) {
            result[0].visible = true;
        }
        return result;
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
                        currentPage={this.state.currentPage + 1}
                        totalPages={this.state.pagesCount}
                        key={type.name}
                    />
                ))}
            </div>
        );
    }
}

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
