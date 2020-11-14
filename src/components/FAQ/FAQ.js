import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  AddRounded,
  RemoveRounded
} from '@material-ui/icons'
import { useTracking } from 'react-tracking'
import RenderContent from '../../components/utils/RenderContent'

const useStyles = makeStyles( theme => ({
  root: {
    margin: theme.spacing(3,0),

    '&.Mui-expanded': {
      margin: theme.spacing(3,0),
    },

    '& .MuiAccordionSummary-root': {
      position: 'relative',
      backgroundImage: theme.gradients.primaryDiagonal,
      padding: '0 12px',
      alignItems: 'flex-start',

      '&.Mui-expanded': {
        margin: 0,
        minHeight: '0 !important',
      },
      '& .MuiAccordionSummary-content': {
        order: 1,
        zIndex: 1,
        '&.Mui-expanded': {
          margin: '12px 0',
        }
      },
      '& .MuiAccordionSummary-expandIcon': {
        margin: "12px 0 0",
        zIndex: 1,
        padding: '0 6px 0 0',
        '&.Mui-expanded': {
          transform: 'none'
        },
        '& svg': {
          color: theme.palette.grey['900'],
          stroke: theme.palette.grey['900'],
        }
      },
    },
    '& .MuiAccordionSummary-root::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 0,
      animation: 'transparentToWhite 300ms',
      animationFillMode: 'both'
    },
    '& .Mui-focused::before': {
      animation: 'whiteToPink 300ms both',
      outline: '1px solid #aaa'
    },
    '& .Mui-expanded::before': {
      animation: 'whiteToTransparent 300ms both',
    },
    '& .MuiAccordionDetails-root': {
      display: 'block'
    }
  },
  panelDetails: {
    '& p:last-child': {
      marginBottom: 0
    }
  }
}))

const FAQ = (props) => {
  const { index, title, desc, expanded = true, clickHandler } = props
  const classes = useStyles()
  const [isExpanded, setIsExpanded] = useState(false)
  const { trackEvent } = useTracking()

  // externally control the expansion of this component
  useEffect(() => {
    setIsExpanded(prev => {
      if(clickHandler){
        clickHandler(index,expanded)
      }
      return expanded
    })
  },[expanded, clickHandler, index])

  // toggle this faq
  const handleChange = () => {
    setIsExpanded(prev => {
      // alert parent component that this faq's expanded state has changed
      if(clickHandler){
        clickHandler(index,!prev)
      }
      // toggle state value
      return !prev
    })
  }

  const trackClick = (e) => {
    // about to be expanded
    if(!isExpanded){
      const location = window.location.pathname.replace(/\//g,"-")
      trackEvent({
        prop41: `BioBank|AccordianExpand|FAQ${location}-${index + 1}`,
        events: 'event72',
        eventName: 'FAQ'
      })
    }
  }


  return (
    <Accordion square expanded={isExpanded} onChange={handleChange} className={classes.root} elevation={25}>
      <AccordionSummary expandIcon={isExpanded ? <RemoveRounded /> : <AddRounded />} onClick={trackClick} aria-controls={`faq-${index}-content`} id={`faq-${index}-header`}>
        <Typography variant="h4" component="h4">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className={classes.panelDetails} component="div">
          <RenderContent source={desc} />
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default FAQ