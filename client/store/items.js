import axios from 'axios'

/////////// Action Type //////////
const SET_ITEMS = 'SET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

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
        item
    }
}

const itemupdate = item => {
    return {
        type: UPDATE_ITEM,
        item
    }
}

const itemdelete = item => {
    return {
        type: DELETE_ITEM,
        item
    }
}

//////////// Thunks  ///////////
export const fetchItems = () => async (dispatch) => {
    const { data } = await axios.get('/api/items')
    dispatch(setitems(data))
}

export const postItem = (item) => async (dispatch) => {
    const { data } = await axios.post('/api/items', item)
    dispatch(itempost(data))
}

export const updateItem = (id, item) => async (dispatch) => {
    const { data } = await axios.put('/api/items', { id, ...item })
    dispatch(itemupdate(data))
}

export const deleteItem = (itemId) => async (dispatch) => {
    const { data } = await axios.delete(`/api/items/${itemId}`)
    dispatch(itemdelete(data))
}

/////////// Reducer ////////////
export default function (state = [], action) {
    switch (action.type) {
        case SET_ITEMS:
            return action.items
        case ADD_ITEM:
            return [action.item, ...state]
        case UPDATE_ITEM:
            state = state.filter(item => item.id !== action.item.id);
            return [action.item, ...state]
        case DELETE_ITEM:
            return state.filter(item => item.id !== action.item.id)
        default:
            return state
    }
}