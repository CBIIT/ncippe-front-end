import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e6fd6',
      light: '#e7f2ff',
      medium: '#d2e2f7',
      lightGrey: '#f2f5f8'
    },
    error: {
      main: '#d63e04', //red
      light: '#fdeae2'
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
      light: '#cfd2d8',
      medium: '#707070',
    }
  },
  gradients: {
    primary: 'linear-gradient(#facfdc, #d2e2f7)'
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
        right: "24px",
        transform: 'none',
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
      }
    }
  }
});