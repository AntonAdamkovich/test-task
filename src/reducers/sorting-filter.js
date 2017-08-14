export default function sortingFilter(state, action) {
    switch (action.type) {
    case 'SORT_PRODUCTS': {
        const currentState = [...state.products];
        return {
            ...state,
            products: currentState.sort((a, b) => {
                switch (action.payload) {
                case 'price':
                    return a.price - b.price;
                case 'name':
                    return a.name.localeCompare(b.name);
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
