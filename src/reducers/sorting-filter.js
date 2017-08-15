import _ from 'lodash';

export default function sortingFilter(state, action) {
    switch (action.type) {
    case 'SORT_PRODUCTS': {
        const currentState = [...state.products];
        return {
            ...state,
            products: currentState.sort((a, b) => {
                switch (true) {
                case _.isNumber(a[action.payload]):
                    return a[action.payload] - b[action.payload];
                case _.isString(a[action.payload]):
                    return a[action.payload].localeCompare(b[action.payload]);
                default:
                    return a.price - b.price;
                }
            }),
        };
    }

    default: {
        const currentState = [...state.products];
        return {
            ...state,
            products: currentState.sort((a, b) => a.price - b.price),
        };
    }
    }
}
