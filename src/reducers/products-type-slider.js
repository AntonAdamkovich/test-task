export default function productTypeSlider(state, action) {
    switch (action.payload) {
    case 'NEXT': {
        let currentPage = state.sliderState.currentPage + 1;
        let newStartItemIndex = state.sliderState.lastItemIndex;
        let newLastItemIndex = newStartItemIndex + state.sliderState.itemsPerPage;
        if (newStartItemIndex >= state.sliderState.totalItemsCount) {
            newStartItemIndex = 0;
            newLastItemIndex = newStartItemIndex + state.sliderState.itemsPerPage;
            currentPage = 0;
        }

        return {
            ...state,
            products: [...state.products],
            sliderState: {
                ...state.sliderState,
                startItemIndex: newStartItemIndex,
                lastItemIndex: newLastItemIndex,
                currentPage,
            },
        };
    }
    case 'PREVIOUS': {
        let currentPage = state.sliderState.currentPage - 1;
        let newLastItemIndex = state.sliderState.startItemIndex;
        let newStartItemIndex = newLastItemIndex - state.sliderState.itemsPerPage;
        if (newStartItemIndex < 0) {
            newLastItemIndex = Math.ceil(state.sliderState.totalItemsCount / state.sliderState.itemsPerPage) * state.sliderState.itemsPerPage;
            newStartItemIndex = newLastItemIndex - state.sliderState.itemsPerPage;
            currentPage = state.sliderState.pagesCount - 1;
        }
        return {
            ...state,
            products: [...state.products],
            sliderState: {
                ...state.sliderState,
                startItemIndex: newStartItemIndex,
                lastItemIndex: newLastItemIndex,
                currentPage,
            },
        };
    }
    default:
        return state;
    }
}
