// src/theme.js

import { createTheme } from '@mui/material/styles';

// Light Theme
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#075D99', // Light primary blue
            light: '#FFF', // Lighter blue
        },
        secondary: {
            main: '#005C9E', // Darker blue
        },
        background: {
            default: '#FFF', // Light background
            paper: '#FFFFFF', // White paper background

        },
        text: {
            primary: '#333333', // Dark text
            secondary: '#777777', // Lighter gray text
        },
    },
    typography: {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        h4: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '1rem',
            color: '#333333',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px',
                    textTransform: 'none',
                    padding: '10px 20px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
});

// Dark Theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Lighter blue for dark mode
        },
        secondary: {
            main: '#ff4081', // Secondary color in dark mode
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1e1e1e', // Darker paper background
        },
        text: {
            primary: '#ffffff', // Light text in dark mode
            secondary: '#bbbbbb', // Grayish text in dark mode
        },
    },
    typography: {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        h4: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '1rem',
            color: '#ffffff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '50px',
                    textTransform: 'none',
                    padding: '10px 20px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                },
            },
        },
    },
});

export { lightTheme, darkTheme };
