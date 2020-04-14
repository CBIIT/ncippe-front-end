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
    blue: 'linear-gradient(#d2e2f7, rgba(255,255,255,0))',
    lightBlue: 'linear-gradient(#eff4fb, rgba(255,255,255,0) 20%)',
    blueReverse: 'linear-gradient(rgba(255,255,255,0), #f0f5fb)',
    primaryDiagonal: 'linear-gradient(315deg, #FFEBF1 0%, #F3EEF6 51%, #E8F0FA 100%)'
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    //custom shadow on index 25
    "0 1px 18px 0 rgba(13,28,60,0.1)"
  ],
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
    h5: {
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
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
        padding: "8px 16px 6px",
        textTransform: 'uppercase',
        backgroundColor: "#ffb73d", // theme.palette.gold.main
        color: "#000",
        fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: 1,
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
    MuiStepLabel: {
      vertical: {
        alignItems: "flex-start",
        '& .MuiStepLabel-iconContainer': {
          position: 'relative',
          top: 7
        }
      },
    },
    MuiDivider: {
      root: {
        height: '2px'
      }
    }
  }
});