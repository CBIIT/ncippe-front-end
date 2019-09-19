import React, { useEffect, useState } from 'react'
import { Router, Link as RouterLink } from '@reach/router'
import { AppBar, Box, Link, Container, Grid, Tab, Tabs, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons'

const useStyles = makeStyles( theme => ({
  pageHeader: {
    backgroundImage: theme.gradients.primaryDiagonal,
    padding: theme.spacing(4,5),
    boxShadow: 'inset 0 -13px 13px -13px rgba(30,111,214,0.2)',
    '& h1': {
      fontSize: 22,
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        fontSize: 26,
        textAlign: 'left',
      }
    }
  },
  appbarContainer: {
    padding: 0,
  },
  appbar: {
    backgroundColor: theme.palette.primary.medium
  },
  boxMain: {
    padding: theme.spacing(3,0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5,3),
    }
  }
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles()

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box className={classes.boxMain}>{children}</Box>
    </Typography>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
// };

const StyledTabs = withStyles(theme => ({
  root: {
    '& .MuiTabs-scrollButtons': {
      backgroundColor: '#d2e2f7',
      // border: `1px solid #7a98bf`,
      boxShadow: 'inset 0 0 13px 0 rgba(30,111,214,0.2)',
      color: theme.palette.primary.main,
      fontWeight: 'bold'
    },

    '& .MuiTabs-scroller': {
      overflowY: 'hidden'
    },
    '& .MuiTabs-flexContainer': {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    },
    '& .MuiTab-root': {
      overflow: 'visible',
      borderRight: '1px solid #fafafa',
      borderLeft: '1px solid transparent',
      color: '#0D1C3C',
      fontWeight: 'bold',
      fontSize: 16,
      // backgroundColor: '#d2e2f7',
      zIndex: 0,
      [theme.breakpoints.up('sm')]: {
        border: 'none',
        paddingRight: 32,
        marginLeft: 0,
        paddingLeft: 0,
      },

      '&:first-of-type': {
        borderRight: 'none'
      },
      '&:last-of-type': {
        borderLeft: 'none',
        paddingLeft: 16,

        '&::before': {
          left: 0
        },
      },

      '& .MuiTab-wrapper': {
        zIndex: 3
      },
    },
    '& .MuiTab-root::before': {
      backgroundColor: theme.palette.primary.medium,
      [theme.breakpoints.up('sm')]: {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 32,
        bottom: 0,
        left: -32,
        zIndex: 2
      }
    },
    '& .MuiTab-root::after': {
      color: '#d2e2f7',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        content: '"◢"',
        position: 'absolute',
        right: 14,
        zIndex: 1,
        transform: 'rotate(-45deg)',
        fontSize: 36,
        
        textShadow: '0 0 13px #7a98bf',
        // borderLeft: '24px solid #fff',
        // borderTop: '24px solid transparent',
        // borderBottom: '24px solid transparent',
      },
    },
    '& .Mui-selected': {
      borderLeft: '1px solid transparent',
      borderRight: '1px solid transparent',
      backgroundColor: '#fff',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'transparent',
      },
      '& ~ a': {
        borderLeft: '1px solid #fafafa',
        borderRight: '1px solid transparent',
      }
    },
    '& .Mui-selected::before': {
      backgroundColor: '#fff',
    },

    '& .Mui-selected::after': {
      color: '#fff',
      // textShadow: '0 0 13px #7a98bf',
      // borderLeft: '24px solid #fff',
      // borderTop: '24px solid transparent',
      // borderBottom: '24px solid transparent',
    },
  },
  indicator: {
    display: 'none'
  }
}))(props => <Tabs {...props} />)

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Discuss = withStyles(theme => ({
  text: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '74%'
    },
    [theme.breakpoints.up('md')]: {
      width: '64%'
    }
  },
  mapPlaceholder: {
    width: 470,
    height: 470,
    backgroundColor: "#d8d8d8",
    padding: theme.spacing(3)
  }
}))(({classes, index, isMobile}) => (
  <TabPanel index={index}>
    <Typography className={classes.text} variant={isMobile ? "body1" : "body2"}>To join the Biobank, you must be in the care of a doctor at a participating hospital. Talk to your doctor to determine if participation is right for you.</Typography>
    <Box className={classes.mapPlaceholder} my={6}>Map Placeholder</Box>
  </TabPanel>
))


const Consent = withStyles(theme => ({
  videoPlaceholder: {
    width: 470,
    height: 264,
    backgroundColor: "#d8d8d8",
    padding: theme.spacing(3)
  },
  iconLink: {
    display: 'inline-flex',
    alignItems: 'center',
    margin: theme.spacing(3,0,4),
    '& svg': {
      marginLeft: 4
    }
  }
}))(({classes, index, isMobile}) => (
  <TabPanel index={index}>
    <Typography variant={isMobile ? "body1" : "body2"}>After you and your doctor discuss your participation in the Cancer Moonshot Biobank and decide you'd like to participate, you will be asked to sign a consent form. A research coordinator will be there to answer any questions you may have.</Typography>
    <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="h4" rel="noopener noreferrer" target="_blank">Review the consent form <OpenInNewIcon /></Link>
    <Box className={classes.videoPlaceholder}>Video placeholder</Box>
  </TabPanel>
))

const Donate = withStyles(theme => ({
  textColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(3)
    }
  },
  imgColumn: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3)
    }
  },
  bottomSpacer: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5)
    }
  },
  img: {
    maxWidth: 410
  }
}))(({classes, index, isMobile}) => (
  <TabPanel index={index}>
    <Grid container>
      <Grid item xs={12} sm={6} lg={8} className={classes.textColumn}>
        <Typography className={classes.bottomSpacer} variant={isMobile ? "body1" : "body2"}>Donated blood and tissue will be sent to the Cancer Moonshot Biobank over the course of 3-5 years. The Biobank may also collect other relevant medical information from your hospital record.</Typography>

        <Typography variant="h3" component="h3">Blood samples</Typography>
        <Typography className={classes.bottomSpacer}>The hospital staff will draw a few tubes of blood for the Biobank when you're already having blood drawn for your routine care.</Typography>

        <Typography variant="h3" component="h3">Tissue samples</Typography>
        <Typography>When your doctor does a biopsy for your cancer care, they will collect extra tissue for the Biobank.</Typography>
        <Typography className={classes.bottomSpacer}>In some cases your doctor may schedule a biopsy just to get tissue for the biobank and to do the biomarker test.</Typography>

        <Typography variant="h3" component="h3">Medical information</Typography>
        <Typography className={classes.bottomSpacer}>We will collect relevant information from your medical record, such as your diagnosis and past treatments.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} lg={4} className={classes.imgColumn}>
        <img className={classes.img} src={`/${process.env.PUBLIC_URL}assets/images/doctor-and-patient.jpg`} alt="doctor and patient" height="380" />
      </Grid>
    </Grid>
  </TabPanel>
))

const Testing = ({index,isMobile}) => (
  <TabPanel index={index}>
    <Typography variant="h3" component="h3">Biomarker Testing</Typography>
    <Typography>Content placeholder</Typography>
  </TabPanel>
)

const WhatToExpectPage = (props) => {
  const classes = useStyles()
  const [value, setValue] = useState(()=>{
    switch(window.location.pathname){
      case '/expect':
        return 3
      case '/expect/consent':
        return 2
      case '/expect/donate':
        return 1
      case '/expect/testing':
        return 0
      default:
        return 3
    }
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 600)
    })
    //clean up
    return () => {}
  },[isMobile])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box>
      <Container className={classes.pageHeader}>
        <Typography variant="h2" component="h1">What to expect if you join the Biobank</Typography>
      </Container>
      <Container className={classes.appbarContainer}>
        <AppBar className={classes.appbar} position="static" elevation={0}>
          <StyledTabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons={isMobile ? 'on' : 'auto'}
            aria-label="scrollable auto tabs example"
          >
            {/* Reverse the order of the tabs for arrows to display properly */}
            {/* New tabs will become index 0 and other existing tabs must be bumpped up a number */}
            {/* Update {value} default state index as well */}
            <Tab disableRipple component={RouterLink} to="testing" label="Get your biomarker test" {...a11yProps(0)} />
            <Tab disableRipple component={RouterLink} to="donate" label="Donate samples" {...a11yProps(1)} />
            <Tab disableRipple component={RouterLink} to="consent" label="Give your consent" {...a11yProps(2)} />
            <Tab disableRipple component={RouterLink} to="./" label="Talk to your doctor" {...a11yProps(3)} />
          </StyledTabs>
        </AppBar>
      </Container>
      <Container className={classes.tabsContainer}>
        <Router>
          <Discuss index={3} isMobile={isMobile} path="/*" />
          <Consent index={2} isMobile={isMobile} path="consent" />
          <Donate index={1} isMobile={isMobile} path="donate"/>
          <Testing index={0} isMobile={isMobile} path="testing" />
        </Router>
      </Container>
    </Box>
  )
}

export default WhatToExpectPage