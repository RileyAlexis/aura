import { createTheme } from "@mui/material";

export const auraDefault = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#dc8800',
          contrastText: 'rgba(181,181,181,0.87)',
        },
        secondary: {
          main: 'rgba(206,29,29,0.87)',
          contrastText: '#ffadad',
        },
        text: {
          primary: '#04d600',
          secondary: '#047d01',
          disabled: '#6e8a6e',
        },
        background: {
          default: 'rgba(0,0,0,0.78)',
          paper: '#1c1c1c',
        },
        error: {
          main: '#0088ad',
        },
        warning: {
          main: '#00ce94',
        },
        info: {
          main: '#ffab00',
        },
        success: {
          main: '#69f0ae',
        },
        divider: '#1e3d10',
      },
      typography: {
        fontFamily: 'Open Sans',
        fontSize: 15,
        fontWeightBold: 800,
      },
      body: {
        backgroundColor: '#1c1c1c'
      }
      
    })
