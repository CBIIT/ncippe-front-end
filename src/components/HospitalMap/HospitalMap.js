import React, { useEffect } from 'react'
import { Box, Grid, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useScript } from '../../components/utils/useScript'
import { useTranslation } from 'react-i18next'

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
      cursor: 'pointer',
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
  const [mapStylesLoaded, mapStylesError] = useScript('https://unpkg.com/leaflet@1.5.1/dist/leaflet.css')
  const [mapScriptLoaded, mapScriptError] = useScript('https://unpkg.com/leaflet@1.5.1/dist/leaflet.js')
  const { t, i18n } = useTranslation(['eligibility','hospitalList'])
  const hospitalData = i18n.getResourceBundle(i18n.languages[0],'hospitalList').hospitals

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

      Object.keys(hospitalData).map((item, i) => {
        const hospital = hospitalData[item]
        const gpsMarker = hospital.gps_coordinates.split(",")
        window.L.marker(gpsMarker,{
          title: hospital.pin_popup_text
        }).addTo(map).bindPopup(hospital.pin_popup_text).on('click',clickZoom); 
      })
    }
  },[mapScriptLoaded])

  const updateMap = (e) => {
    e.preventDefault()
    const cords = e.currentTarget.dataset.location.split(",")
    map.setView(cords,11)
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
              {
                hospitalData && Object.keys(hospitalData).map((item, i) => {
                  const hospital = hospitalData[item]
                  return (
                    <Link key={i} data-location={hospital.gps_coordinates} onClick={updateMap}>
                      <Typography className={classes.title}>{hospital.title}</Typography>
                      <Typography>
                        {hospital.address_1}<br />
                        {hospital.address_2 && <>{hospital.address_2} <br /></>}
                        {hospital.city}, {hospital.state} {hospital.zip}<br />
                        {hospital.poc && <>{hospital.poc} <br /></>}
                        {hospital.telephone}
                      </Typography>
                    </Link>
                  )
                })
              }
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default HospitalMap