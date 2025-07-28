// src/theme/styles/homePageSx.js

import { color, text } from "d3";

// static 
export const bannerBaseSx = {
    textAlign: 'center',
    py: 1,
  };
  
  export const bannerTextSx = {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  };
  
  export const bannerVariantsSx = {
    default: {
      bgcolor: '#FCECF1',
      border: '1px solid #F9DEE7',
    },
    warning: {
      bgcolor: '#fce2b5',
      border: '1px solid #FEB73C',
    },
    info: {
      bgcolor: '#E7F0FB',
      border: '1px solid #bdd9fc',
    },
    success: {
      bgcolor: '#E3FCF2',
      border: '1px solid #01C585',
    }
  };

  export const closeAccountDialogSx = {
    position: 'relative',
  };
  
  export const closeAccountDialogContentSx = (theme) => ({
    padding: theme.spacing(5),
    '&:first-of-type': {
      paddingTop: theme.spacing(5),
    },
  });
  
  export const closeDialogButtonSx = {
    position: 'absolute',
    top: 0,
    right: 0,
  };
  
  export const closeAccountIconSx = (theme) => ({
    fontSize: '6em',
    float: 'left',
    marginRight: theme.spacing(3),
    fill: theme.palette.success.main,
  });

  export const dividerSx = (theme) => ({
    width: '100%',
    margin: theme.spacing(3, 0),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(7, 0),
    },
  })
  
  export const heroTextSx = {
    wordBreak: 'break-word',
    mt: { xs:2, sm: 2},
    width: {
      xs: '60%',
      sm: '60%',
      md: '50%',
    },
    ml: {
      sm: '6%',
      md: '12%',
    },
  };
  
  export const infoBoxSx = theme => ({
    width: '100%',
    padding: theme.spacing(2, 3, 4),
    color: theme.palette.navy.dark,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      padding: theme.spacing(4, 0),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 0),
    },
  });
  
  export const infoBoxTitleSx = {
    fontSize: {
      xs: 22,
    },
  };

  export const infoOffsetPaperSx = theme =>({
    position: 'relative',
    top: {
      xs: theme.spacing(-4),
      sm: theme.spacing(-6),
      md: theme.spacing(-8),
    },
    width: {
      sm: '76%',
    },
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: {
      xs: theme.spacing(-4),
      sm: theme.spacing(-6),
      md: theme.spacing(-8),
    },
  });
  
  export const howItWorksGridSx = {
    '& > div': {
      textAlign: 'center',
      mb: {
        xs: 3,
        sm: 0,
      },
    },
    '& p': {
      width: {
        xs: '80%',
        md: '100%',
      },
      mx: 'auto',
    },
  };
  export const howItWorksIconSx =  { width: '100px', height: '100px' } ;
  
  export const fullWidthAccentImageSx = (theme) => ({
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 22%',
    backgroundSize: 'cover',
    height: '40vw',
    maxHeight: 450,

     backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/micro/woman-with-head-scarf.jpg)`,

    // Mobile (≥ 380px)
    '@media (min-width: 380px)': {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/mobile/woman-with-head-scarf.jpg)`,
    },

    // Micro HD
    [`@media (min-width: 380px) and (min-resolution: 192dpi) and (max-width: ${theme.breakpoints.values.sm - 0.01}px)`]: 
    ({
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/mobileHD/woman-with-head-scarf.jpg)`,
    }),

    // Tablet (≥ sm)
    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/tablet/woman-with-head-scarf.jpg)`,
    },

    // Tablet HD (≥ sm and high-res)
    [`@media (min-width: ${theme.breakpoints.values.sm}px) and (min-resolution: 192dpi)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/tabletHD/woman-with-head-scarf.jpg)`,
    },

    // Desktop (≥ md)
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/desktop/woman-with-head-scarf.jpg)`,
    },

    // Desktop HD (≥ md and high-res)
    [`@media (min-width: ${theme.breakpoints.values.md}px) and (min-resolution: 192dpi)`]: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/fullWidth/desktopHD/woman-with-head-scarf.jpg)`,
    },
  });
  
  export const createAccountBtnSx = {
    my: 4,
    py: 1,
    px: 4,
  };
  
  export const haveAccountBtnSx = {
    px: 4,
    py: 1,
    backgroundColor: 'common.white',
  };
  
  export const featureLinksSx = {
    textAlign: {
      xs: 'center',
      md: 'left',
    },
  };

  export const gridWithImagesSx = (theme) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(3),
    '& img': {
      display: 'inline-block',
      maxWidth: 600,
      margin: theme.spacing(1, 0, 3),
    },
  });
  
  export const gridItemImgSx = {
    textAlign: 'center',
    '& img': {
      maxWidth: {
        xs: 600,
        md: 380,
      },
    },
  };
  
  export const cardTextSx = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    ml: 3,
  };
  
  export const cardIconSx = {
    width: '100%',
    maxWidth: 50,
    height: 50,
  };
  
  export const cardTitleSx = {
    fontWeight: 'bold',
  };

  export const h6TextSx = {
    fontFamily: 'Montserrat, Open Sans, sans-serif',
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '30px',
    letterSpacing: '.46px',
    color: '#183787',
  };

  export const h6ChartTiltleSx ={
    fontSize: '1.25rem',
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    color: '#183787',
    lineHeight: '1.6rem',
    letterSpacing: '0.0075em',
  }
  
  export const screenshotSx = {
    maxWidth: 300,
  };
  
  export const stepperSx = {
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
  };
  
  export const linkListSx = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& a': {
      display: 'inline-block',
      my: 0.5,
      '& svg': {
        mb: '-6px',
      },
    },
  };

  export const mainTitleSx = {
    fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '22px',
    lineHeight: '36px',
    letterSpacing: '-.47px',
  
    // Responsive for 'sm' and up
    '@media (min-width:600px)': {
      fontSize: '42px',
      lineHeight: '62px',
      letterSpacing: '-.4px',
      '& sup': {
        fontSize: '40%',
      },
    },
  
    // Responsive for 'smLandscape' – requires custom breakpoint or hardcoded width
    '@media (min-width:880px) and (orientation: landscape)': {
      fontSize: '62px',
      lineHeight: '74px',
      letterSpacing: '-.6px',
    }
  };
  
  export const biobankSx = (theme) => ({
    backgroundImage: theme.gradients.primaryDiagonal,
  });

  export const blueGradientContainerSx = (theme) => ({
    backgroundImage: theme.gradients.blueReverse,
  });
  
  export const volunteerSx = (theme) => ({
    overflow: 'auto',
    position: 'relative',
    background: `url(${process.env.PUBLIC_URL}/assets/images/soft-diamond-background-long.svg) no-repeat bottom center, ${theme.gradients.primaryDiagonal}`,
    paddingBottom: {
      xs: '112px',
      sm: '208px',
      md: '304px',
    },
    '& h2': {
      marginBottom: theme.spacing(2),
    },
  });
  
  export const volunteerTextSx = (theme) => ({
    width: {
      xs: '84%',
      sm: '54%',
    },
    textAlign: 'center',
    margin: `${theme.spacing(2)} auto ${theme.spacing(5)}`,
  });
  