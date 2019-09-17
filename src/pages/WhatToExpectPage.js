import React, { useEffect, useState } from 'react'
import { Router, Link } from '@reach/router'
import { AppBar, Box, Container, Tab, Tabs, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  pageHeader: {
    backgroundImage: theme.gradients.primaryDiagonal,
    padding: theme.spacing(4,5),
    boxShadow: 'inset 0 -13px 13px -13px rgba(30,111,214,0.2)'
  },
  appbarContainer: {
    padding: 0,
  },
  appbar: {
    backgroundColor: theme.palette.primary.medium
  },
  imgDoctorAndPatient: {
    maxWidth: '40%'
  }
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
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
      // justifyContent: 'space-between',
      // flexDirection: 'row-reverse',
      // direction: 'rtl'
    },
    '& .MuiTabs-flexContainer': {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    },
    '& .MuiTab-root': {
      overflow: 'visible',
      borderRight: '1px solid #fafafa',
      borderLeft: '1px solid transparent',
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

// const StyledMobileNac = withStyles(theme => ({

// }))(props => <Tabs {...props} />)

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


const Discuss = () => (
  <>
    <Typography variant="body2">To join the Biobank, you must be in the care of a doctor at a participating hospital. Talk to your doctor to determine if participation is right for you.</Typography>
    <Box my={6}>Map Placeholder</Box>
  </>
)

const Donate = () => (
  <>
    <Typography variant="body2">After you and your doctor discuss your participation in the Cancer Moonshot Biobank and decide you'd like to participate, you will be asked to sign a consent form. A research coordinator will be there to answer any questions you may have.</Typography>
    <a href="#" rel="noopener noreferrer" target="_blank">Review the consent form</a>
    <Box my={6}>Video placeholder</Box>
  </>
)

const Consent = () => (
  <>
    <Typography variant="body2">Donated blood and tissue will be sent to the Cancer Moonshot Biobank over the course of 3-5 years. The Biobank may also collect other relevant medical information from your hospital record.</Typography>

    <Typography variant="h3" component="h3">Blood samples</Typography>
    <Typography>The hospital staff will draw a few tubes of blood for the Biobank when you're already having blood drawn for your routine care.</Typography>

    <Typography variant="h3" component="h3">Tissue samples</Typography>
    <Typography>When your doctor does a biopsy for your cancer care, they will collect extra tissue for the Biobank.</Typography>
    <Typography>In some cases your doctor may schedule a biopsy just to get tissue for the biobank and to do the biomarker test.</Typography>

    <Typography variant="h3" component="h3">Medical information</Typography>
    <Typography>We will collect relevant information from your medical record, such as your diagnosis and past treatments.</Typography>

    <img src={`/${process.env.PUBLIC_URL}assets/images/doctor-and-patient.jpg`} alt="doctor and patient" height="380" />

  </>
)

const Testing = () => (
  <>
    <Typography variant="h3" component="h3">Biomarker Testing</Typography>
    <Typography>Content placeholder</Typography>
  </>
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
    }
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 600)
    })
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
            <Tab disableRipple component={Link} to="testing" label="Get your biomarker test" {...a11yProps(0)} />
            <Tab disableRipple component={Link} to="donate" label="Donate samples" {...a11yProps(1)} />
            <Tab disableRipple component={Link} to="consent" label="Give your consent" {...a11yProps(2)} />
            <Tab disableRipple component={Link} to="./" label="Talk to your doctor" {...a11yProps(3)} />
          </StyledTabs>
        </AppBar>
      </Container>
      <Container className={classes.tabsContainer}>
        <Router>
          <Discuss path="/*" />
          <Donate path="donate"/>
          <Consent path="consent" />
          <Testing path="testing" />
        </Router>
      </Container>
    </Box>
  )
}

export default WhatToExpectPage