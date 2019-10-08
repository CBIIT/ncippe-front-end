import React, { useEffect, useState } from 'react'
import { Router, Link as RouterLink } from '@reach/router'
import { AppBar, Box, Card, CardMedia, Link, Container, Grid, Tab, Tabs, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons'
import { useScript } from '../components/utils/useScript'

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
  title: {
    fontWeight: 'bold',
    lineHeight: 'normal',
    marginBottom: theme.spacing(1),
  },
  mapPlaceholder: {
    // padding: theme.spacing(3)
    // height: 470,
  },
  map: {
    height: 470,
    // marginRight: theme.spacing(3)
  },
  locations: {
    height: 470,
    overflow: 'auto',

    '& > a': {
      display: 'block',
      margin: theme.spacing(0,3),
      padding: theme.spacing(3,0),
      borderBottom: `1px solid #ccc`,
      lineHeight: 'normal',
      textDecoration: 'none',
      color: theme.palette.text.primary,
      '& p': {
        lineHeight: 'normal',
      },
      '&:last-child': {
        borderBottom: 'none'
      }
    }
  }
}))(({classes, index, isMobile}) => {
  const [mapStylesLoaded,mapStylesError] = useScript('https://unpkg.com/leaflet@1.5.1/dist/leaflet.css')
  const [mapScriptLoaded,mapScriptError] = useScript('https://unpkg.com/leaflet@1.5.1/dist/leaflet.js')

  const locations = {
    NY: [40.8800853,-73.8798439],
    VA: [37.544077,-77.432143],
    TN: [35.5354435,-89.6785178],
    IL: [41.868636,-87.681454],
    NM: [35.0843187,-106.6219699]
  }

  let map

  useEffect(()=>{
    if(mapScriptLoaded) {
      map = window.L.map('map').setView([38.5561, -90.2496], 5)
      const OpenStreetMap = window.L.tileLayer('	https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });

      OpenStreetMap.addTo(map)

      const clickZoom = (e) => {
        map.setView(e.target.getLatLng(),9);
      }


      //Bronx, NY
      window.L.marker([40.8800853,-73.8798439],{
        title: "Montefiore Medical Center"
      }).addTo(map).bindPopup('Montefiore Medical Center').on('click',clickZoom); 

      //Richmond, VA
      window.L.marker([37.544077,-77.432143],{
        title: "VCU Massey Cancer Center"
      }).addTo(map).bindPopup('VCU Massey Cancer Center').on('click',clickZoom); 

      //Covington, TN
      window.L.marker([35.5354435,-89.6785178],{
        title: "Baptist Memorial Health Care"
      }).addTo(map).bindPopup('Baptist Memorial Health Care').on('click',clickZoom); 

      //Chicago, IL
      window.L.marker([41.868636,-87.681454],{
        title: "Stroger Hospital of Cook County"
      }).addTo(map).bindPopup('Stroger Hospital of Cook County').on('click',clickZoom); 

      //Albuquerque, NM
      window.L.marker([35.0843187,-106.6219699],{
        title: "The University of New Mexico"
      }).addTo(map).bindPopup('The University of New Mexico').on('click',clickZoom); 


    }
  },[mapScriptLoaded])

  const updateMap = (e) => {
    e.preventDefault()
    // const cords = e.currentTarget.dataset.location
    const state = e.currentTarget.dataset.location
    map.setView(locations[state],9)
  }

  return (<TabPanel index={index}>
    <Typography className={classes.text} variant={isMobile ? "body1" : "body2"}>To join the Biobank, you must be in the care of a doctor at a participating hospital. Talk to your doctor to determine if participation is right for you.</Typography>
    <Box className={classes.mapPlaceholder} my={6}>
      <Grid container>
        <Grid item xs={12} sm={7} md={8}>
          <div id="map" className={classes.map}></div>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <Box className={classes.locations}>
            <Link data-location="IL" onClick={updateMap}>
              <Typography className={classes.title}>Stroger Hospital of Cook County Minority Underserved NCORP</Typography>
              <Typography>
                2240 West Ogden Avenue,<br />
                Floor 12<br />
                Chicago, Illinois 60612<br />
                Meng Ru<br />
                (555) 555-5555
              </Typography>
            </Link>
            <Link data-location="TN" onClick={updateMap}>
              <Typography className={classes.title}>Baptist Memorial Health Care/Mid South Minority Underserved NCORP</Typography>
              <Typography>
                Baptist Cancer Center,<br />
                1995 Highway 51 South<br />
                Covington, Tennessee 38019<br />
                Emlen Beaver<br />
                (555) 555-5555<br />
              </Typography>
            </Link>
            <Link data-location="NM" onClick={updateMap}>
              <Typography className={classes.title}>New Mexico Minority Underserved NCORP</Typography>
              <Typography>
                The University of New Mexico,<br />
                MSC 09 5220<br />
                Albuquerque, New Mexico 87131<br />
                Saami Al Samad<br />
                (555) 555-5555<br />
              </Typography>
            </Link>
            <Link data-location="VA" onClick={updateMap}>
              <Typography className={classes.title}>VCU Massey Cancer Center Minority Underserved NCORP</Typography>
              <Typography>
                800 East Leigh Street<br />
                Richmond, Virginia 23298<br />
                Paulina Gayoso<br />
                (555) 555-5555<br />
              </Typography>
            </Link>
            <Link data-location="NY" onClick={updateMap}>
              <Typography className={classes.title}>Montefiore Minority Underserved NCORP</Typography>
              <Typography>
                111 East 210th Street<br />
                Bronx, New York 10467<br />
                Heather Clark<br />
                (555) 555-5555<br />
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </TabPanel>)
})


const Consent = withStyles(theme => ({
  container: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '74%'
    },
    [theme.breakpoints.up('md')]: {
      width: '64%'
    }
  },
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
  },
  mediaWrapper: {
    position: 'relative',
    paddingBottom: '56.25%' /* 16:9 */,
    height: 0,

    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
}))(({classes, index, isMobile}) => (
  <TabPanel index={index}>
    <Box className={classes.container}>
      <Typography variant={isMobile ? "body1" : "body2"}>After you and your doctor discuss your participation in the Cancer Moonshot Biobank and decide you'd like to participate, you will be asked to sign a consent form. A research coordinator will be there to answer any questions you may have.</Typography>
      <Link className={classes.iconLink} href="https://www.youtube.com/watch?v=iSKqg50b5oc" variant="h4" rel="noopener noreferrer" target="_blank">Review the consent form <OpenInNewIcon /></Link>
      <Card>
        <div className={classes.mediaWrapper}>
          <CardMedia
            component='iframe'
            className={classes.media}
            src='https://www.youtube.com/embed/OyCFbZYgL3U'
            title='A Dialogue on Cancer Disparities, Prevention, and Research: Facebook Live'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </Card>
    </Box>
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

const Testing = ({index}) => (
  <TabPanel index={index}>
    <Typography variant="h3" component="h3">Biomarker Testing</Typography>
    <Typography>Content placeholder</Typography>
  </TabPanel>
)

const WhatToExpectPage = () => {
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