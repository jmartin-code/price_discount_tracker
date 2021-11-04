import axios from 'axios'


/////////// Action Type //////////
const SET_ITEMS = 'SET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'

///////// Action Creators ////////
const setitems = items => {
    return {
        type: SET_ITEMS,
        items
    }
}

const itempost = item => {
    return {
        type: ADD_ITEM,
        items
    }
}

//////////// Thunks  ///////////

export const fetchItems = () => async (dispatch) => {
    const { data } = await axios.get('/api/items')
    dispatch(setitems(data))
}

export const postItem = (item) => async (dispatch) => {
    const { data } = await axios.post('/api/items', item)
    console.log(data)
    // return dispatch(setitems(data))
}

/////////// Reducer ////////////
export default function (state = [], action) {
    switch (action.type) {
        case SET_ITEMS:
            return action.items
        case ADD_ITEM:
            return [action.item, ...state]
        default:
            return state
    }
}