import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, Link, Paper, Typography } from '@material-ui/core'
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
  },
  location: {
    display: 'block',
    margin: theme.spacing(1),
    padding: theme.spacing(1,0),
    lineHeight: 'normal',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    cursor: 'pointer',
    '& > div': {
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
    },
    '& p': {
      lineHeight: 'normal',
    },
    '&:hover': {
      textDecoration: 'none',
    },
    '&:hover > div,&.active > div': {
      backgroundColor: 'rgba(30, 111, 214, 0.08)',
    },
  },
  divider: {
    margin: theme.spacing(0,3)
  }
}))

const HospitalMap = (props) => {
  const classes = useStyles()
  const [mapStylesLoaded, mapStylesError] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css')
  const [mapScriptLoaded, mapScriptError] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js')
  // const { t, i18n } = useTranslation(['eligibility','hospitalList'])
  // const hospitalData = i18n.getResourceBundle(i18n.languages[0],'hospitalList').hospitals
  const [hospitalData, setHospitalData] = useState([])
  const [map, setMap] = useState()
  const [markers, setMarkers] = useState([])
  const [refs, setRefs] = useState([])

  useEffect(()=>{
    if(mapScriptLoaded) {
      if(!map){
        const bssMap = window.L.map('map')
          .locate({setView: true, maxZoom:7}) //local view based on user's geolocation
          // .setView([38.5561, -90.2496], 5) //wide view from central USA

        // fallback map view if location is not available
        bssMap.on('locationerror',(e) => {
          bssMap.setView([38.5561, -90.2496], 5)
        })
          
        const mapTiles = window.L.tileLayer('https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=401fa637f2f647f298b4176b24ca7ef5', {
                maxZoom: 17,
                minZoom: 4,
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              });
  
        mapTiles.addTo(bssMap)

        setMap(bssMap)
      }
    }
  },[mapScriptLoaded])

  useEffect(() => {
    // const clickZoom = (e) => {
    //   map.setView(e.target.getLatLng(),11);
    // }

    if(map && hospitalData.length > 0) {
      let pins = []
      Object.keys(hospitalData).map((item, i) => {
        const hospital = hospitalData[item]
        const gpsMarker = hospital.gps_coordinates.split(",")
        const thisMarker = window.L.marker(gpsMarker,{
          title: hospital.title,
          i
        })
        pins.push(thisMarker)
        thisMarker.addTo(map).bindPopup(hospital.title)
        setMarkers(prev => [...prev,thisMarker])
        // .on('click',clickZoom); 
      })

      const updateList = (index) => {
        refs.map((ref) => {
          ref.current.classList.remove('active')
        })
        if(index !== undefined){
          refs[index].current.classList.add("active")
      
          refs[index].current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          })
        }
      }

      const handlePopup = (e) => {
        const i = e.type === 'popupopen' ? e.popup._source.options.i : undefined
        updateList(i)
      }

      map.on('popupopen popupclose',handlePopup)

      // const bounds = window.L.latLngBounds(pins)
      // const group = new window.L.featureGroup(pins);
      // map.fitBounds(group.getBounds());

      // setRefs(hospitalData.reduce((acc, value, i) => {
      //     acc[i] = React.createRef();
      //     return acc;
      //   }, {})
      // )
    }
  }, [map, hospitalData])

  useEffect(() => {
    getAPI.then(api => {
      api.getHospitalList().then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        Object.keys(resp).map((item, i) => {
          setRefs(prev => [...prev,React.createRef()])
        })
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
    const i = e.currentTarget.dataset.index
    map.setView(cords,11)
    markers[i].openPopup()
  }

  return (
    <Box className={classes.mapPlaceholder} mt={6}>
      <Paper elevation={25}>
        <Grid container>
          <Grid item xs={12} sm={7} md={8}>
            <div id="map" className={classes.map}></div>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <Box className={classes.locations}>
              {
                hospitalData && Object.keys(hospitalData).map((item, i) => {
                  const hospital = hospitalData[item]
                  // console.log(refs[i])
                  return (
                    <React.Fragment key={i}>
                      <Link href="#" className={classes.location} ref={refs[i]} data-location={hospital.gps_coordinates} onClick={updateMap} data-index={i}>
                        <Box>
                          <Typography className={classes.title}>{hospital.title}</Typography>
                          <Typography>
                            {hospital.address_1}<br />
                            {hospital.address_2 && <>{hospital.address_2} <br /></>}
                            {hospital.city}, {hospital.state} {hospital.zip}<br />
                            {hospital.poc && <>{hospital.poc} <br /></>}
                            {hospital.poc_email && <>{hospital.poc_email} <br /></>}
                            {hospital.website && <>{hospital.website} <br /></>}
                            {formatPhoneNumber(hospital.telephone)} {hospital.extension && <>x{hospital.extension}</>}
                          </Typography>
                        </Box>
                      </Link>
                      {i < hospitalData.length-1 && <Divider className={classes.divider} />}
                    </React.Fragment>
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