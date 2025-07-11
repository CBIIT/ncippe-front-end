import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Box, Divider, Grid, Paper, Typography, useTheme, styled} from '@mui/material'
import { useScript } from '../../components/utils/useScript'
import getAPI from '../../data'
import {formatPhoneNumber} from '../../utils/utils'
import { 
  Person as PersonIcon,
  Phone as PhoneIcon,
  MailOutline as EmailIcon,
  Language as WebsiteIcon
} from '@mui/icons-material'

const LocationBox = styled(Box)(({ theme }) => ({
  display: 'block', // Equivalent to div display
  margin: theme.spacing(1),
  lineHeight: 'normal',
  textDecoration: 'none', // Assuming it might be used as a link or has link-like behavior
  color: theme.palette.text.primary,
  cursor: 'pointer',
  // Inner div styling (borderRadius, padding)
  '& > div': { // This inner div might not be needed if padding/borderRadius are on LocationBox itself
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
  },
  // Paragraph styling
  '& p': {
    lineHeight: 'normal',
  },
  // Hover state styling
  '&:hover': {
    textDecoration: 'none', // Remove text decoration on hover
  },
  // Hover and active state styling for the inner div
  '&:hover > div, &.active > div': { // Use &.active for the active class
    backgroundColor: 'rgba(30, 111, 214, 0.05)',
  },
}));

const HospitalMap = () => {
  // const [mapStylesLoaded, mapStylesError] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css')
  // const [mapScriptLoaded, mapScriptError] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js')
  useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css')
  const [mapScriptLoaded] = useScript('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js')
  // const { t, i18n } = useTranslation(['eligibility','hospitalList'])
  // const hospitalData = i18n.getResourceBundle(i18n.languages[0],'hospitalList').hospitals
  const [hospitalData, setHospitalData] = useState([])
  const [map, setMap] = useState()
  const [markers, setMarkers] = useState([])
  const refs = useRef([])
  const theme = useTheme()


  const updateList = useCallback( (index) => {
    refs.current.forEach((ref) => {
      ref.current?.classList.remove('active')
    })
    if(index !== undefined && refs.current[index] && refs.current[index].current) {
      refs.current[index].current.classList.add("active")
  
      refs.current[index].current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, []);

  const handlePopup = useCallback((e) => {
    const i = e.type === 'popupopen' ? e.popup._source.options.i : undefined
    updateList(i)
  },[updateList]);

   // Remove previous event listeners before adding new ones
  

  // const bounds = window.L.latLngBounds(pins)
  // const group = new window.L.featureGroup(pins);
  // map.fitBounds(group.getBounds());

  // setRefs(hospitalData.reduce((acc, value, i) => {
  //     acc[i] = React.createRef();
  //     return acc;
  //   }, {})
  // )
useEffect(()=>{
    if(mapScriptLoaded && !map && window.L) {
      const mapElement = document.getElementById('map');
      if(mapElement){

      const bssMap = window.L.map('map').setView([38.5561, -90.2496], 5)

      // fallback map view if location is not available
        bssMap.on('locationerror',(e) => {
          console.error("Location not available: ",e)
          bssMap.setView([38.5561, -90.2496], 5)
        })
        // use user's geolocation if it's available
        bssMap.locate({setView: true, maxZoom:7}) 

        // .setView([38.5561, -90.2496], 5) //wide view from central USA
          
     window.L.tileLayer('https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=401fa637f2f647f298b4176b24ca7ef5', {
                maxZoom: 17,
                minZoom: 4,
                attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(bssMap);
        setMap(bssMap) 
      setTimeout(() => {
        bssMap.invalidateSize();
      }, 200);
    } 
  }
  },[mapScriptLoaded, map])

  useEffect(() => {
    // const clickZoom = (e) => {
    //   map.setView(e.target.getLatLng(),11);
    // }
    let addedMarkers = []; 
    if(map && hospitalData.length > 0) {
      markers.forEach(marker => map.removeLayer(marker));
      setMarkers([]);
      refs.current = [];
     // let pins = []
      hospitalData.forEach((hospital, i) => {
        const gpsMarker = hospital.gps_coordinates.split(",")
        const thisMarker = window.L.marker(gpsMarker,{
          title: hospital.title,
          i
        })
        thisMarker.addTo(map).bindPopup(hospital.title)
        addedMarkers.push(thisMarker)
        //setMarkers(prev => [...prev,thisMarker])
        refs.current[i] = React.createRef()
        // .on('click',clickZoom); 
      });

      setMarkers(addedMarkers)

      map.off('popupopen popupclose',handlePopup);

      map.on('popupopen popupclose',handlePopup);
    }

    return () => {
      if (map) {
          map.off('popupopen popupclose', handlePopup);
          markers.forEach(marker => {
            if(map.hasLayer(marker)){
              map.removeLayer(marker)
            }

          } );
      }
    };
  }, [map, hospitalData, handlePopup]);

     // Remove previous event listeners before adding new ones
   

  useEffect(() => {
    getAPI.then(api => {
      api.getHospitalList().then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        //
        setHospitalData(resp)
        //console.log('MHL  resp: ', resp)
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
    <Box mt={6}>
      <Paper elevation={25}>
        <Grid container>
          <Grid
            size={{
              xs: 12,
              sm: 6
            }}>
            <Box id="map" sx={{ height: 480, width: '100%'}}></Box>
          </Grid>
          <Grid 
            size={{
              xs: 12,
              sm: 6
            }}>
            <Box sx={{ height: 480, overflow: 'auto',
              display: 'flex', flexWrap: 'wrap',
              justifyContent: 'center', gap: theme.spacing(2),
              p: theme.spacing(1)
             }}>
              {
                hospitalData.map((hospital, i) => {
                  //const hospital = hospitalData[item]
                  // console.log(refs[i])
                  return (
                    <React.Fragment key={i}>
                      <LocationBox ref={refs[i]} data-location={hospital.gps_coordinates} 
                      onClick={updateMap} data-index={i} 
                      onKeyDown={handleKeyDown} tabIndex={0} 
                      sx={{
                        cursor: 'pointer',
                        p: 2,
                        m: 1,
                        borderRadius: 1,
                        width: 400,

                        '&:hover': {
                          backgroundColor: 'rgba(30, 111, 214, 0.05)'
                        },
                        '&.active': {
                          backgroundColor: 'rgba(30, 111, 214, 0.05)'
                        }
                      }}>                 
                          <Typography variant="h6" fontWeight="bold" mb={1}>{hospital.title}</Typography>
                          <Typography>
                            {hospital.address_1}
                            {hospital.address_2 && `, {hospital.address_2}`}
                            , {hospital.city}, {hospital.state} {hospital.zip}<br />
                          </Typography>
                          <Typography sx={{ mt: 1, wordBreak: 'break-word' }}>
                            {hospital.poc && <>
                            <PersonIcon sx={{ verticalAlign: 'middle', marginRight: theme.spacing(1)  }}/> {hospital.poc} <br /></>}
                            {hospital.poc_email && <><EmailIcon sx={{ verticalAlign: 'middle', marginRight: theme.spacing(1)  }} />
                             <a href={`mailto:${hospital.poc_email}`}>{hospital.poc_email}</a> <br /></>}
                            <PhoneIcon sx={{ verticalAlign: 'middle', marginRight: theme.spacing(1)  }} /> 
                            <a href={`tel:${formatPhoneNumber(hospital.telephone)}`}>{formatPhoneNumber(hospital.telephone)}</a> {hospital.extension && `x${hospital.extension}`}
                            {hospital.website && <><br /><WebsiteIcon sx={{ verticalAlign: 'middle', marginRight: theme.spacing(1)  }} /> 
                            <a href={hospital.website} rel='noopener noreferrer' target="_blank">{hospital.website}</a></>}
                          </Typography>
                        </LocationBox>
                      {/* {i < hospitalData.length-1 && 
                      <Divider sx={{ mx: 3 }}  />} */}
                    </React.Fragment>
                  )
                })
              }
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default HospitalMap
