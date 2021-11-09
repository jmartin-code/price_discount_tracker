import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#29a8ab',
        },
        secondary: {
            main: '#f37736',
        },
    },
    typography: {
        fontFamily: 'Yanone Kaffeesatz',
        fontSize: 20
    },
});