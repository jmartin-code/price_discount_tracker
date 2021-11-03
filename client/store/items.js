import axios from 'axios'


/////////// Action Type //////////
const SET_ITEMS = 'SET_ITEMS'

///////// Action Creators ////////
const setitems = items => {
    return {
        type: SET_ITEMS,
        items
    }
}

//////////// Thunks  ///////////
export const fetchItems = () => async (dispatch) => {
    const { data } = await axios.get('/api/items')
    return dispatch(setitems(data))
}

/////////// Reducer ////////////
export default function (state = [], action) {
    switch (action.type) {
        case SET_ITEMS:
            return action.items
        default:
            return state
    }
}