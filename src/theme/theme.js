import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({});

export const theme = createMuiTheme({
  breakpoints: {
    keys: [
      "xs",
      "sm",
      "smLandscape",
      "md",
      "lg",
      "xl"
    ],
    values: {
      xs: 0,
      sm: 600,
      smLandscape: 880,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      main: '#1e6fd6',
      light: '#e7f2ff',
      medium: '#d2e2f7',
      dark: '#194F93',
      lightGrey: '#f2f5f8'
    },
    error: {
      main: '#d63e04', //red 
      light: '#fdeae2',
      dark: '#b53500', //darken(saturate(adjust-hue(#3f51b5, 1), 5.26), 7.25)
      text: '#d83d00'
    },
    success: {
      main: '#04c585', //green
      light: '#e3fcf3'
    },
    pink: {
      main: '#ffcfdd',
      light: '#ffebf1'
    },
    gold: {
      main: '#ffb73d',
      light: '#fff3c1'
    },
    navy: {
      dark: '#0d1c3c'
    },
    grey: {
      xlight: '#fafafa',
      light: '#cfd2d8',
      medium: '#707070',
    }
  },
  gradients: {
    primary: 'linear-gradient(#d2e2f7, #facfdc)',
    blue: 'linear-gradient(#d2e2f7, transparent)',
    lightBlue: 'linear-gradient(#eff4fb, transparent 40%)',
    blueReverse: 'linear-gradient(transparent, #f0f5fb)',
    primaryDiagonal: 'linear-gradient(315deg, #FFEBF1 0%, #F3EEF6 51%, #E8F0FA 100%)'
  },
  text: {
    primary: '#0d1c3c'
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '42px',
      lineHeight: '62px',
      paragraphHeight: '30px',
      letterSpacing: '-.4px',
    },
    h2: {
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '26px',
      lineHeight: '42px',
      paragraphHeight: '20px',
      letterSpacing: '-.4px',
    },
    h3: {
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '32px',
      paragraphHeight: '20px',
      letterSpacing: 0,
    },
    h4: {
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '26px',
      paragraphHeight: '20px',
      letterSpacing: '.2',
    },
    body1: {
      fontFamily: '"Open Sans", Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '30px',
      paragraphHeight: '20px',
      letterSpacing: '.46px'
    },
    body2: {
      fontFamily: '"Open Sans", Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '38px',
      paragraphHeight: '20px',
      letterSpacing: '.47px'
    },
    button: {
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '26px',
      paragraphHeight: '20px',
      letterSpacing: '1px',
      textTransform: 'none'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: '"Open Sans", Montserrat, Helvetica, Arial, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '30px',
          paragraphHeight: '20px',
          letterSpacing: '.46px',
          backgroundColor: "#fff",
        }
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#656565',
        borderWidth: '2px'
      }
    },
    MuiBadge: {
      root: {
        width: '100%',
        height: "100%",
        verticalAlign: 'top',
        position: 'static',
        display: 'block',
      },
      badge: {
        borderRadius: '0 0 6px 6px',
        padding: "8px 16px",
        textTransform: 'uppercase',
        backgroundColor: "#ffb73d", // theme.palette.gold.main
        color: "#000",
        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '12px',
        height: 'auto',
      },
      anchorOriginTopRightRectangle: {
        right: "24px",
        transform: 'none',
      }
    },
    MuiGrid: {
      'spacing-xs-8': {
        width: 'calc(100% + 32px)',
        margin: '-16px',
        [breakpoints.up('sm')]: {
          width: 'calc(100% + 48px)',
          margin: '-24px',
        },
        [breakpoints.up('md')]: {
          width: 'calc(100% + 64px)',
          margin: '-32px',
        }
      }
    },
    MuiDialogTitle: {
      root: {
        padding: '24px 24px 0 24px',
      }
    },
    MuiDialogActions: {
      root: {
        justifyContent: 'flex-start',
        padding: '24px'
      }
    },
    MuiStepper: {
      root: {
        marginTop: '16px',
        backgroundColor: 'transparent'
      }
    },
    MuiDivider: {
      root: {
        height: '2px'
      }
    }
  }
});