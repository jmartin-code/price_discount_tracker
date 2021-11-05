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


function itemCard({ item }) {
    const dispatch = useDispatch()

    const handleRemove = (itemId) => {
        dispatch(deleteItem(itemId))
    }
    const handleUpdate = () => {
        console.log('update')
    }

    //////// Currency Default ////////
    numeral.defaultFormat('$0,0.00');

    return (
        <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, ':hover': { boxShadow: 8 } }}>
                {item.targetPrice > item.price ? (
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
                    <Typography variant='body1'>
                        Price: {numeral(item.price).format()}
                    </Typography>
                    <Typography variant='body1'>
                        Target Price: {numeral(item.targetPrice).format()}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <Chip label='Update' color="primary" size="small" icon={<EditIcon />} sx={{ mx: 1 }} onClick={handleUpdate} />
                    <Chip label='Remove' color="error" size="small" icon={<HighlightOffIcon />} sx={{ mx: 1 }} onClick={() => handleRemove(item.id)} />
                </Box>
            </Paper>
        </Grid>
    )
}

export default itemCard
