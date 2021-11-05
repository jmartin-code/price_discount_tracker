import { Container, Dialog, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import ItemCard from './itemCard'
import Form from '../addItem/From'


const items = ({ items }) => {
    const [openForm, setopenForm] = useState(false)
    const [itemToUpdate, setitemToUpdate] = useState({})

    const handleCloseForm = () => {
        setopenForm(false)
    }

    const handleOpenForm = (updateItem) => {
        setitemToUpdate(updateItem)
        setopenForm(true)
    }

    return (
        <>
            <Typography align='center' variant='h5' sx={{ m: 3 }}>
                ALL ITEMS
            </Typography>
            <Dialog open={openForm} onClose={handleCloseForm}>
                <Form title={'UPDATE ITEM'} item={itemToUpdate} handleCloseForm={handleCloseForm} />
            </Dialog>
            <Container>
                <Grid container spacing={2}>
                    {items.map(item => (
                        <ItemCard item={item} handleOpenForm={handleOpenForm} key={item.id} />
                    ))}
                </Grid>
            </Container >
        </>
    )
}

export default items
