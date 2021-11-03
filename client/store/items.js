import axios from 'axios'


/////////// Action Type //////////
const SET_ITEMS = 'SET_ITEMS'

///////// Action Creators ////////
const setitems = items => {
    return {
        type: SET_ITMES,
        items
    }
}


//////////// Thunks  ///////////
export const fetchItems = () => {
    console.log('testing')
    return async (dispatch) => {

    }
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