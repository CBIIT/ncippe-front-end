import React, { useEffect, useState } from 'react'
import { Box, Grid, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useScript } from '../../components/utils/useScript'
import { useTranslation } from 'react-i18next'

import getAPI from '../../data'
import {formatPhoneNumber} from '../../utils/utils'

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
  // const hospitalData = i18n.getResourceBundle(i18n.languages[0],'hospitalList').hospitals
  const [hospitalData, setHospitalData] = useState([])

  let map

  useEffect(()=>{
    if(mapScriptLoaded) {
      map = window.L.map('map').setView([38.5561, -90.2496], 5)
      const OpenStreetMap = window.L.tileLayer('https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=401fa637f2f647f298b4176b24ca7ef5', {
              maxZoom: 19,
              attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });

      OpenStreetMap.addTo(map)

      const clickZoom = (e) => {
        map.setView(e.target.getLatLng(),11);
      }

      Object.keys(hospitalData).map((item, i) => {
        const hospital = hospitalData[item]
        const gpsMarker = hospital.gps_coordinates.split(",")
        window.L.marker(gpsMarker,{
          title: hospital.title
        }).addTo(map).bindPopup(hospital.title).on('click',clickZoom); 
      })
    }
  },[mapScriptLoaded])

  useEffect(() => {
    getAPI.then(api => {
      api.getHospitalList().then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        setHospitalData(resp)
      })
    })
    .catch(error => {
      console.error(error)
    })
        
  }, [])

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
                        {formatPhoneNumber(hospital.telephone)}
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