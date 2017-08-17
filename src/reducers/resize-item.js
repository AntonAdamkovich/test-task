export default function resizeItem(state, action) {
    switch (action.payload) {
    case 'INCREASE': {
        let startItemIndex = state.sliderState.startItemIndex;
        let lastItemIndex = state.sliderState.lastItemIndex;
        let itemsDiff = action.itemsDiff;

        while (itemsDiff > 0) {
            if (startItemIndex > 0) {
                startItemIndex += 1;
            } else {
                lastItemIndex += 1;
            }

            itemsDiff -= 1;
        }
        const itemsPerPage = state.sliderState.itemsPerPage + action.itemsDiff;
        const currentPage = Math.ceil(startItemIndex / itemsPerPage);
        const pagesCount = Math.ceil(state.sliderState.totalItemsCount / itemsPerPage);
        return {
            ...state,
            products: [...state.products],
            sliderState: {
                ...state.sliderState,
                containerWidth: action.containerWidth,
                startItemIndex,
                lastItemIndex,
                currentPage,
                itemsPerPage,
                pagesCount,
            },
        };
    }
    case 'DECREASE': {
        let startItemIndex = state.sliderState.startItemIndex;
        let lastItemIndex = state.sliderState.lastItemIndex;
        let itemsDiff = action.itemsDiff;

        while (itemsDiff > 0) {
            if (startItemIndex > 0) {
                startItemIndex += 1;
            } else {
                lastItemIndex -= 1;
            }

            itemsDiff -= 1;
        }
        const itemsPerPage = state.sliderState.itemsPerPage - action.itemsDiff;
        const currentPage = Math.ceil(startItemIndex / itemsPerPage);
        const pagesCount = Math.ceil(state.sliderState.totalItemsCount / itemsPerPage);
        return {
            ...state,
            products: [...state.products],
            sliderState: {
                ...state.sliderState,
                containerWidth: action.containerWidth,
                startItemIndex,
                lastItemIndex,
                currentPage,
                itemsPerPage,
                pagesCount,
            },
        };
    }
    default:
        return state;
    }
}
