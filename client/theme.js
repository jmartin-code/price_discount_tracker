import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: 'rgba(0,53,80,0.86)',
        },
        secondary: {
            main: '#00e2f5',
        },
    },
    typography: {
        fontFamily: 'Yanone Kaffeesatz',
        fontSize: 20
    },
});