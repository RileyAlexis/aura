import { createTheme } from "@mui/material";

const GenericTechno = {
  fontFamily: 'Generic Techno',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Generic Techno'),
    url('./fonts/GenericTechno.otf') format('opentype')
  `,
};


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
      backgroundColor: {
        default: 'rgba(0,0,0,0.78)',
        paper: 'rgba(28, 28, 28, 0.65)',
      },
      error: {
        main: '#99001a',
      },
      warning: {
        main: '#99001a',
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
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(45deg, rgba(184, 83, 0, 0.15) 30%, rgba(51, 23, 0, 0.3) 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 1px 2px 1px rgba(255, 105, 135, .1)',
            color: 'white',
            padding: '5px',
            margin: '5px',
          },
        },
      },
    MuiPaper: {
      styleOverrides: {
        root:{
          boxShadow: '0 1px 1px 1px rgba(250, 160, 60, .25)',
          marginBottom: '2px',
          padding: '8px',
          background: 'rgba(28, 28, 28, 0.85)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          padding: '5px',
          margin: '5px',
        }
      }
    },
    MuiGrid: {
      variants : [
        {
          props: { variant: 'border'},
          style: {
            border: '2px solid gray',
          }
        }
      ],
      styleOverrides: {
        root: {
          // border: '1px solid white',
          // margin: '3px',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: '5px',
        }
      }
    }
    },
    props: {
      MuiList: {
        dense: true,
      },
      MuiMenuItem: {
        dense: true,
      },
      MuiTable: {
        size: 'small',
      },
      MuiButton: {
        size: 'small',
      },
      MuiButtonGroup: {
        size: 'small',
      },
      MuiCheckbox: {
        size: 'small',
      },
      MuiFab: {
        size: 'small',
      },
      MuiFormControl: {
        margin: 'dense',
        size: 'small',
      },
      MuiFormHelperText: {
        margin: 'dense',
      },
      MuiIconButton: {
        size: 'small',
      },
      MuiInputBase: {
        margin: 'dense',
      },
      MuiInputLabel: {
        margin: 'dense',
      },
      MuiRadio: {
        size: 'small',
      },
      MuiSwitch: {
        size: 'small',
      },
      MuiTextField: {
        margin: 'dense',
        size: 'small',
      },
      MuiTooltip: {
        arrow: true,
      },
    },
  });
