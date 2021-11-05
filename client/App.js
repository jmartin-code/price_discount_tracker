import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchItems } from './store'

///////// COMPONENTS //////////////
import Items from './components/items/items'
import AddItem from './components/addItem/addItem'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { CssBaseline } from '@mui/material'

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
            <CssBaseline />
            <Navbar />
            <AddItem />
            <Items items={items} />
            <Footer />
        </>
    )
}

export default App