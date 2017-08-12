const initialState = ['men', 'woman', 'children'];

export default function productTypesReducer(state = initialState, action) {
    switch (action.type) {
    case 'ADD_TYPE':
        return [
            ...state,
            action.payload,
        ];
    case 'REMOVE_TYPE':
        return state.filter(item => item !== action.payload);
    default:
        return state;
    }
}
