import { Container, Grid, Typography } from '@mui/material'
import React from 'react'

import ItemCard from './itemCard'


const items = ({ items }) => {
    return (
        <>
            <Typography align='center' variant='h5' sx={{ m: 3 }}>
                ALL ITEMS
            </Typography>
            <Container>
                <Grid container spacing={2}>
                    {items.map(item => (
                        <ItemCard item={item} key={item.id} />
                    ))}
                </Grid>
            </Container >
        </>
    )
}

export default items
