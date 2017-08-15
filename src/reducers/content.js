export default function productTypes(state, action) {
    switch (action.payload) {
    case 'INIT':
    case 'NEXT':
    case 'PREVIOUS':
    default:
        return state;
    }
}
