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
      main: '#399F37',
      light: '#2C792B',
      dark: '#4AC148',
      contrastText: 'rgba(181,181,181,0.87)',
    },
    secondary: {
      main: '#8F418C',
      light: '#A13893',
      dark: '#D06FC3',
      contrastText: '#ffadad',
    },
    text: {
      primary: '#04d600',
      secondary: '#B4C2B4',
      disabled: '#6e8a6e',
    },
    backgroundColor: {
      light: '#D4D4D4',
      dark: '#464646',
    },
    error: {
      main: '#99001a',
      light: '#EB2A0F',
      dark: '#EB2A0F'
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
      variants: [
        {
          props: { variant: 'empty' },
          style: {
            border: 0,
            borderRadius: 10,
            textTransform: 'none',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '5px',
            margin: '5px'
          }
        },
        {
          props: { variant: 'sidebar' },
          style: {
            border: 0,
            borderRadius: 10,
            textTransform: 'none',
            color: 'secondary',
            background: 'linear-gradient(45deg, rgba(184, 83, 0, 0.25) 30%, rgba(51, 23, 0, 0.5) 90%)',
            padding: '5px',
            margin: '5px',
          }
        }
      ],
      styleOverrides: {
        root: {

        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 1px 1px rgba(250, 160, 60, .25)',
          margin: '0px',
          paddingLeft: '8px',
          background: 'rgba(28, 28, 28, 0.85)',
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'logger' },
          style: {
            padding: '2px',
            fontSize: '1rem',
            font: 'monospace',
            color: '#07db00',
            fontFamily: 'monospace'
          }
        }
      ],
      styleOverrides: {
        root: {
          padding: '5px',
          margin: '0.1em',
        }
      }
    },
    MuiGrid: {
      variants: [
        {
          props: { variant: 'border' },
          style: {
            border: '2px solid white',
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
