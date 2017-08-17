import initialState from '../example-data';
import sortingFilter from './sorting-filter';
import productTypeSlider from './products-type-slider';
import resizeItem from './resize-item';

export default function productTypes(state = initialState, action) {
    switch (action.type) {
    case 'TOGGLE_TYPE':
        return state.map((item) => {
            if (item.name === action.payload) {
                return {
                    ...item,
                    products: [...item.products],
                    visible: !item.visible,
                };
            }
            return item;
        });
    case 'SLIDER_CLICK':
        return state.map((item) => {
            if (item.name === action.target) {
                return productTypeSlider(item, action);
            }
            return item;
        });
    case 'RESIZE':
        return state.map(item => resizeItem(item, action));
    case 'INIT':
        return state.map((item) => {
            const totalItemsCount = item.products.length;
            const pagesCount = Math.ceil(totalItemsCount / action.payload.itemsPerPage);
            const sliderState = {
                ...item.sliderState,
                ...action.payload,
                totalItemsCount,
                pagesCount,
            };
            return {
                ...item,
                products: [...item.products],
                sliderState,
            };
        });
    case 'SORT_PRODUCTS':
        return state.map(item => sortingFilter(item, action));
    default:
        return state.map(item => initSliderState(item));
    }
}

function initSliderState(item) {
    return {
        ...item,
        products: [...item.products],
        sliderState: {
            containerWidth: 0,
            itemWidth: 0,
            itemsPerPage: 0,
            currentPage: 0,
            startItemIndex: 0,
            lastItemIndex: 0,
            totalItemsCount: 0,
            pagesCount: 0,
        },
    };
}
