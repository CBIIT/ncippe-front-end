
import React, { useEffect } from 'react'
import { Box, Grid, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useScript } from '../../components/utils/useScript'

const useStyles = makeStyles( theme => ({
  title: {
    fontWeight: 'bold',
    lineHeight: 'normal',
    marginBottom: theme.spacing(1),
  },
  mapPlaceholder: {
    width: '100%'
  },
  map: {
    height: 480,
  },
  locations: {
    height: 480,
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
}))

const HospitalMap = (props) => {
  const classes = useStyles()
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
      const OpenStreetMap = window.L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
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

  return (
    <Box className={classes.mapPlaceholder} mt={6}>
      <Paper elevation={2}>
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
      </Paper>
    </Box>
  )
}

export default HospitalMap