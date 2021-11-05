import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

///////////// UI //////////
import LoadingButton from '@mui/lab/LoadingButton';
import { Container, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

///////////// STORE //////////////
import { postItem, updateItem } from '../../store'


function From(props) {
    const { title, handleCloseForm } = props

    const item = props.item || {}

    const [input, setinput] = useState({
        url: item.link || '',
        targetPrice: item.targetPrice || '',
        email: item.email || ''
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
            if (title === 'ADD NEW ITEM') {
                setcreating(true)
                await dispatch(postItem(input));
                setcreating(false)
                setinput({
                    url: '',
                    targetPrice: '',
                    email: ''
                })
                handleCloseForm(false)
            }
            else {
                setcreating(true)
                await dispatch(updateItem(item.id, input));
                setcreating(false)
                handleCloseForm(false)
            }
        }
        catch (err) {
            setcreating(false)
            console.log(err.response)
        }
    }
    return (
        <Container maxWidth='sm' sx={{ p: 5 }}>
            <Typography align='center' variant='h4'>
                Amazon Price Monitor
            </Typography>
            <Typography align='center'>
                {title}
            </Typography>
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
                {title === 'ADD NEW ITEM' ? (
                    <LoadingButton disabled={!input.email && !input.targetPrice && !input.url} type='submit' loadingPosition="start"
                        startIcon={<AddIcon />} fullWidth variant='contained' loading={creating} sx={{ borderRadius: 5, mt: 1 }}>
                        Add Item
                    </LoadingButton>
                ) : (
                    <LoadingButton disabled={!input.email && !input.targetPrice && !input.url} type='submit' loadingPosition="start"
                        startIcon={<EditIcon />} fullWidth variant='contained' loading={creating} sx={{ borderRadius: 5, mt: 1 }}>
                        Update Item
                    </LoadingButton>
                )}
            </Box>
        </Container>
    )
}

export default From
