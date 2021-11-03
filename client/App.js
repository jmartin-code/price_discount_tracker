import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchItems } from './store'

const App = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items)
    useEffect(() => {
        dispatch(fetchItems)
    }, [])
    return (
        <div>
            <pre>{JSON.stringify(items, null, 2)}</pre>
        </div>
    )
}

export default App