import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchItems } from './store'

///////// COMPONENTS //////////////
import Items from './components/items/items'
import AddItem from './components/addItem/addItem'

const App = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items)
    useEffect(() => {
        try {
            dispatch(fetchItems())
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <AddItem />
            <Items items={items} />
        </>
    )
}

export default App

// {
//     "id": 2,
//     "name": "Sony Alpha 7 IV Full-Frame Mirrorless Interchangeable Lens Camera",
//     "link": "https://www.amazon.com/Sony-Full-Frame-Mirrorless-Interchangeable-Camera/dp/B09JZT6YK5/",
//     "imageURL": "https://images-na.ssl-images-amazon.com/images/I/71LPbU9sO5L.__AC_SY300_SX300_QL70_FMwebp_.jpg",
//     "price": "2499.99",
//     "targetPrice": "2000",
//     "createdAt": "2021-11-03T16:55:20.704Z",
//     "updatedAt": "2021-11-03T16:55:20.704Z"
//   }