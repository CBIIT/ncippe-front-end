import React, { useState } from 'react';
import { AppBar, Box, Container, Tab, Tabs, Typography } from '@material-ui/core';
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

    '& button': {
      flexGrow: 1,
      position: 'relative'
    },
    '& .MuiTab-root': {
      overflow: 'visible',
      // backgroundColor: '#d2e2f7',
      zIndex: 0,
      paddingRight: 32,
      marginLeft: 0,
      paddingLeft: 0,

      '& .MuiTab-wrapper': {
        zIndex: 3
      }
    },
    '& .MuiTab-root::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 32,
      bottom: 0,
      left: -32,
      backgroundColor: theme.palette.primary.medium,
      zIndex: 2
    },
    '& .MuiTab-root:last-of-type': {
      paddingLeft: 16
    },
    '& .MuiTab-root:last-of-type::before': {
      left: 0
    },
    '& .MuiTab-root::after': {
      content: '"◢"',
      display: 'block',
      position: 'absolute',
      right: 14,
      zIndex: 1,
      transform: 'rotate(-45deg)',
      fontSize: 36,
      color: '#d2e2f7',
      textShadow: '0 0 13px #7a98bf',
      // borderLeft: '24px solid #fff',
      // borderTop: '24px solid transparent',
      // borderBottom: '24px solid transparent',
    },
    '& .Mui-selected': {

      '& ~ button': {
        zIndex: 2
      },
      '& + button::after': {
        textShadow: '0 0 13px #719bd1',
        backgroundColor: '#fff'
      },
    },
    '& .Mui-selected::before': {
      backgroundColor: '#fff',
    },

    '& .Mui-selected::after': {
      color: '#fff',
      textShadow: '0 0 13px #7a98bf',
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

const WhatToExpectPage = (props) => {
  const classes = useStyles()
  const [value, setValue] = useState(3);

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
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
          {/* Reverse the order of the tabs for arrows to display properly */}
          {/* New tabs will become index 0 and other existing tabs must be bumpped up a number */}
          {/* Update {value} default state index as well */}
          <Tab disableRipple label="Get your biomarker test" {...a11yProps(0)} />
          <Tab disableRipple label="Donate samples" {...a11yProps(1)} />
          <Tab disableRipple label="Give your concent" {...a11yProps(2)} />
          <Tab disableRipple label="Talk to your doctor" {...a11yProps(3)} />
          </StyledTabs>
        </AppBar>
      </Container>
      <Container className={classes.tabsContainer}>
        <TabPanel value={value} index={3}>
          {/* Talk to your doctor */}
          <Typography variant="body2">To join the Biobank, you must be in the care of a doctor at a participating hospital. Talk to your doctor to determine if participation is right for you.</Typography>
          <Box my={6} className={classes.map}>Map Placeholder</Box>

        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Give your concent */}
          <Typography variant="body2">After you and your doctor discuss your participation in the Cancer Moonshot Biobank and decide you'd like to participate, you will be asked to sign a consent form. A research coordinator will be there to answer any questions you may have.</Typography>
          <a href="#" rel="noopener noreferrer" target="_blank">Review the consent form</a>
          <Box my={6} className={classes.map}>Video placeholder</Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Donate sample */}
          <Typography variant="body2">Donated blood and tissue will be sent to the Cancer Moonshot Biobank over the course of 3-5 years. The Biobank may also collect other relevant medical information from your hospital record.</Typography>

          <Typography variant="h3" component="h3">Blood samples</Typography>
          <Typography>The hospital staff will draw a few tubes of blood for the Biobank when you're already having blood drawn for your routine care.</Typography>

          <Typography variant="h3" component="h3">Tissue samples</Typography>
          <Typography>When your doctor does a biopsy for your cancer care, they will collect extra tissue for the Biobank.</Typography>
          <Typography>In some cases your doctor may schedule a biopsy just to get tissue for the biobank and to do the biomarker test.</Typography>

          <Typography variant="h3" component="h3">Medical information</Typography>
          <Typography>We will collect relevant information from your medical record, such as your diagnosis and past treatments.</Typography>

          <img className={classes.imgDoctorAndPatient} src={`/${process.env.PUBLIC_URL}assets/images/doctor-and-patient.jpg`} alt="doctor and patient" height="380" />

        </TabPanel>
        <TabPanel value={value} index={0}>
          {/* Get your biomarker test */}
          <Typography variant="h3" component="h3">Biomarker Testing</Typography>
          <Typography>Content placeholder</Typography>

        </TabPanel>
      </Container>
    </Box>
  )
}

export default WhatToExpectPage