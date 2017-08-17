import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductsType from './products-type';

class Content extends React.Component {
    static propTypes = {
        types: PropTypes.arrayOf(PropTypes.object).isRequired,
        onMount: PropTypes.func.isRequired,
        onNextClick: PropTypes.func.isRequired,
        onPreviousClick: PropTypes.func.isRequired,
        onContainerIncrease: PropTypes.func.isRequired,
        onContainerDecrease: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        const containerWidth = this.getContainerWidth();
        const itemWidth = this.getItemWidth();
        const itemsPerPage = this.visibleItemsCount(containerWidth, itemWidth);
        const currentPage = 0;
        const startItemIndex = currentPage * itemsPerPage;
        const lastItemIndex = startItemIndex + itemsPerPage;

        this.contentWidth = (itemWidth * itemsPerPage) + (this.getHorizontalMargins() * itemsPerPage);

        this.props.onMount(
            containerWidth,
            itemWidth,
            itemsPerPage,
            currentPage,
            startItemIndex,
            lastItemIndex,
        );
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
        const containerWidth = parseInt(
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

        return marginLeft + marginRight;
    }

    /**
     * calculate count of visible items of slider
     *
     * @param {number} containerWidth
     * @param {number} itemWidth
     * @returns {number} - number of visible items
     * @memberof Content
     */
    visibleItemsCount(containerWidth, itemWidth) {
        const currentMarginsSum = this.getHorizontalMargins();
        const gapAroundItem = currentMarginsSum || (itemWidth * 0.01);
        let itemsCount = Math.floor(containerWidth / (itemWidth + gapAroundItem));
        if (itemsCount === 0) {
            itemsCount = 1;
        }

        return itemsCount;
    }

    /**
     * handle horizontal resize of window
     *
     * @memberof Content
     */
    handleResize = () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            const currentContainerWidth = this.getContainerWidth();
            const itemWidth = this.getItemWidth();
            if (this.contentWidth > currentContainerWidth) {
                this.contentWidth = currentContainerWidth;
                this.props.onContainerDecrease(currentContainerWidth, 1);
            } else if ((this.contentWidth + itemWidth) <= currentContainerWidth) {
                this.contentWidth = currentContainerWidth;
                this.props.onContainerIncrease(currentContainerWidth, 1);
            }
        }, 250);
    }

    /**
     * handle click on slider controls
     *
     * @memberof Content
     */
    handleControlsClick = (event) => {
        event.preventDefault();
        const target = event.currentTarget.dataset.name;

        if (event.target.matches('.previous-page')) {
            this.props.onPreviousClick(target);
        } else if (event.target.matches('.next-page')) {
            this.props.onNextClick(target);
        }
    }

    /**
     * return array of visible slider elements
     *
     * @param {object} type - element of content block with all data
     * @returns {object[]}
     * @memberof Content
     */
    getVisible(type) {
        const result = type.products.filter((item, index) => {
            return (index >= type.sliderState.startItemIndex && index < type.sliderState.lastItemIndex);
        });

        if (result.length === 0) {
            result.push(type.products[0]);
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
                        products={this.getVisible(type)}
                        visible={type.visible}
                        clickHandler={this.handleControlsClick}
                        currentPage={type.sliderState.currentPage + 1}
                        totalPages={type.sliderState.pagesCount}
                        key={type.name}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    types: state.productType,
});

const mapDispatchToProps = dispatch => ({
    onMount: (
        containerWidth,
        itemWidth,
        itemsPerPage,
        currentPage,
        startItemIndex,
        lastItemIndex,
    ) => {
        dispatch({
            type: 'INIT',
            payload: {
                containerWidth,
                itemWidth,
                itemsPerPage,
                currentPage,
                startItemIndex,
                lastItemIndex,

            },
        });
    },
    onContainerIncrease: (containerWidth, itemsDiff) => {
        dispatch({
            type: 'RESIZE',
            payload: 'INCREASE',
            itemsDiff,
            containerWidth,
        });
    },
    onContainerDecrease: (containerWidth, itemsDiff) => {
        dispatch({
            type: 'RESIZE',
            payload: 'DECREASE',
            itemsDiff,
            containerWidth,
        });
    },
    onNextClick: (target) => {
        dispatch({
            type: 'SLIDER_CLICK',
            payload: 'NEXT',
            target,
        });
    },
    onPreviousClick: (target) => {
        dispatch({
            type: 'SLIDER_CLICK',
            payload: 'PREVIOUS',
            target,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
