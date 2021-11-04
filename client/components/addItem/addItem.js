import React, { useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import { Button, Container, TextField } from '@mui/material'
import { Box } from '@mui/system'
import LoadingButton from '@mui/lab/LoadingButton';

import { useDispatch } from 'react-redux';

import { postItem } from '../../store'

function addItem() {
    const [input, setinput] = useState({
        url: '',
        targetPrice: '',
        email: ''
    })

    const [creating, setcreating] = useState(false)

    const dispatch = useDispatch()

    const handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value
        setinput({ ...input, [name]: value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            setcreating(true)
            await dispatch(postItem(input));
            setcreating(false)
        }
        catch (err) {
            console.log(err.response)
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 5 }}>
                    Add Item New Item To Track
                </Button>
            </Box>
            <Container maxWidth='xs'>
                <Box component='form' onSubmit={handleSubmit}>
                    <TextField
                        margin='normal'
                        name='url'
                        label='Item URL'
                        size="small"
                        fullWidth
                        value={input.url}
                        onChange={handleChange}
                    // required
                    />
                    <TextField
                        margin='normal'
                        name='targetPrice'
                        label='Target Price'
                        size="small"
                        fullWidth
                        value={input.targetPrice}
                        onChange={handleChange}
                    // required
                    />
                    <TextField
                        margin='normal'
                        name='email'
                        label='Email'
                        size="small"
                        fullWidth
                        value={input.email}
                        onChange={handleChange}
                    // required
                    />
                    <LoadingButton disabled={!input.email && !input.targetPrice && !input.url} type='submit' loadingPosition="start"
                        startIcon={<AddIcon />} fullWidth variant='contained' loading={creating} sx={{ borderRadius: 5, mt: 1 }}>
                        Add Item
                    </LoadingButton>
                </Box>
            </Container>
        </>
    )
}

export default addItem
