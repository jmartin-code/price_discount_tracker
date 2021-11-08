import React from 'react'
//////// UI /////////
import { Button, Chip, Grid, Paper, Typography } from '@mui/material'

///// ICONS ////////
import TimerIcon from '@mui/icons-material/Timer';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import numeral from 'numeral';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../store';


function itemCard({ item, handleOpenForm }) {
    const dispatch = useDispatch()

    const handleRemove = (itemId) => {
        dispatch(deleteItem(itemId))
    }
    const handleUpdate = (item) => {
        handleOpenForm(item)
    }

    //////// Currency Default ////////
    numeral.defaultFormat('$0,0.00');

    ///////// Convert string to number for comparison /////
    const targetPrice = item.targetPrice * 1
    const currentPrice = item.price * 1

    return (
        <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, ':hover': { boxShadow: 4 } }}>
                {targetPrice >= currentPrice ? (
                    <Button href={item.link} target="_blank" rel="noopener noreferrer" variant="outlined" color="success" fullWidth endIcon={<CheckIcon />} sx={{ m: 1, borderRadius: 5 }}>
                        It is time to buy!
                    </Button>
                ) :
                    (<Button href={item.link} target="_blank" rel="noopener noreferrer" variant="outlined" color="error" fullWidth endIcon={<TimerIcon />} sx={{ m: 1, borderRadius: 5 }}>
                        Let's wait for a deal!
                    </Button>)}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.imageURL} height='50' />
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography noWrap sx={{ ml: 2 }}>
                            {item.name}
                        </Typography>
                        <Typography noWrap sx={{ ml: 2 }}>
                            {item.email}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                    <Typography align='center'>
                        Price: {numeral(item.price).format()}
                    </Typography>
                    <Typography align='center'>
                        Target Price: {numeral(item.targetPrice).format()}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Chip variant='outlined' label='Update' color="primary" icon={<EditIcon fontSize='small' fontSize='small' />} sx={{ mx: 1 }} onClick={() => handleUpdate(item)} />
                    <Chip variant='outlined' label='Remove' color="error" icon={<HighlightOffIcon fontSize='small' />} sx={{ mx: 1 }} onClick={() => handleRemove(item.id)} />
                </Box>
            </Paper>
        </Grid>
    )
}

export default itemCard
