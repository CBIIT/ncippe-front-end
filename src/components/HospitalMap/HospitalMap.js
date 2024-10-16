import React, { useEffect, useState } from 'react'
import { Box, Divider, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useScript } from '../../components/utils/useScript'

import getAPI from '../../data'
import {formatPhoneNumber} from '../../utils/utils'
import { 
  Person as PersonIcon,
  Phone as PhoneIcon,
  MailOutline as EmailIcon,
  Language as WebsiteIcon
} from '@material-ui/icons'

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
    // padding: theme.spacing(1,0),
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
      backgroundColor: 'rgba(30, 111, 214, 0.05)',
    },
  },
  icon: {
    position: "relative",
    top: 7,
    marginRight: theme.spacing(2),
    color: theme.palette.grey.medium
  },
  divider: {
    margin: theme.spacing(0,3)
  }
}),{name: 'HospitalMap'})

const HospitalMap = (props) => {
  const classes = useStyles()
  // const [mapStylesLoaded, mapStylesError] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css')
  // const [mapScriptLoaded, mapScriptError] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js')
  useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css')
  const [mapScriptLoaded] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js')
  // const { t, i18n } = useTranslation(['eligibility','hospitalList'])
  // const hospitalData = i18n.getResourceBundle(i18n.languages[0],'hospitalList').hospitals
  const [hospitalData, setHospitalData] = useState([])
  const [map, setMap] = useState()
  const [markers, setMarkers] = useState([])
  const [refs, setRefs] = useState([])

  useEffect(()=>{
    if(mapScriptLoaded) {
      if(!map){
        const bssMap = window.L.map('map').setView([38.5561, -90.2496], 5)

        // fallback map view if location is not available
        bssMap.on('locationerror',(e) => {
          console.error("Location not available: ",e)
          bssMap.setView([38.5561, -90.2496], 5)
        })

        // use user's geolocation if it's available
        bssMap.locate({setView: true, maxZoom:7}) 



        // .setView([38.5561, -90.2496], 5) //wide view from central USA
          
        const mapTiles = window.L.tileLayer('https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=401fa637f2f647f298b4176b24ca7ef5', {
                maxZoom: 17,
                minZoom: 4,
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              });
  
        mapTiles.addTo(bssMap)

        setMap(bssMap)
      }
    }
  },[mapScriptLoaded, map])

  useEffect(() => {
    // const clickZoom = (e) => {
    //   map.setView(e.target.getLatLng(),11);
    // }

    if(map && hospitalData.length > 0) {
      let pins = []
      Object.keys(hospitalData).forEach((item, i) => {
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
        refs.forEach((ref) => {
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
  }, [map, hospitalData, refs])

  useEffect(() => {
    getAPI.then(api => {
      api.getHospitalList().then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        Object.keys(resp).forEach((item, i) => {
          setRefs(prev => [...prev,React.createRef()])
        })
        setHospitalData(resp)
        console.log('MHL  resp: ', resp)
      })
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  const updateMap = (e) => {
    if(e.target.tagName.toLowerCase() === "a"){
      return
    }
    e.preventDefault()
    const cords = e.currentTarget.dataset.location.split(",")
    const i = e.currentTarget.dataset.index
    map.setView(cords,11)
    markers[i].openPopup()
  }

  const handleKeyDown = (e) => {
    if(e.key.toLowerCase() === "enter") {
      updateMap(e)
    }
  }

  return (
    <Box className={classes.mapPlaceholder} mt={6}>
      <Paper elevation={25}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <div id="map" className={classes.map}></div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className={classes.locations}>
              {
                hospitalData && Object.keys(hospitalData).map((item, i) => {
                  const hospital = hospitalData[item]
                  // console.log(refs[i])
                  return (
                    <React.Fragment key={i}>
                      <div className={classes.location} ref={refs[i]} data-location={hospital.gps_coordinates} onClick={updateMap} data-index={i} onKeyDown={handleKeyDown} tabIndex="0">
                        <Box>
                          <Typography className={classes.title}>{hospital.title}</Typography>
                          <Typography>
                            {hospital.address_1}
                            {hospital.address_2 && <>, {hospital.address_2}</>}
                            , {hospital.city}, {hospital.state} {hospital.zip}<br />
                          </Typography>
                          <Typography className="breakAll">
                            {hospital.poc && <><PersonIcon className={classes.icon} /> {hospital.poc} <br /></>}
                            {hospital.poc_email && <><EmailIcon className={classes.icon} /> <a href={`mailto:${hospital.poc_email}`}>{hospital.poc_email}</a> <br /></>}
                            <PhoneIcon className={classes.icon} /> <a href={`tel:${formatPhoneNumber(hospital.telephone)}`}>{formatPhoneNumber(hospital.telephone)}</a> {hospital.extension && `x${hospital.extension}`}
                            {hospital.website && <><br /><WebsiteIcon className={classes.icon} /> <a href={hospital.website} rel='noopener noreferrer' target="_blank">{hospital.website}</a></>}
                          </Typography>
                        </Box>
                      </div>
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
