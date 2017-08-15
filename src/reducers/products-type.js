import initialState from '../example-data';
import sortingFilter from './sorting-filter';
import content from './content';

export default function productTypes(state = initialState, action) {
    switch (action.type) {
    case 'TOGGLE_TYPE':
        return state.map((item) => {
            if (item.name === action.payload) {
                return {
                    ...item,
                    visible: !item.visible,
                };
            }

            return item;
        });
    case 'SLIDER_ACTION':
        return state;
    case 'SORT_PRODUCTS':
        return state.map(item => sortingFilter(item, action));
    default:
        return state;
    }
}
