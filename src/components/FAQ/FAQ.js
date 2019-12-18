import React, { useEffect, useState } from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core'
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

    '& .MuiExpansionPanelSummary-root': {
      position: 'relative',
      backgroundImage: theme.gradients.primaryDiagonal,
      padding: '0 12px',

      '&.Mui-expanded': {
        margin: 0,
        minHeight: '0 !important',
      },
      '& .MuiExpansionPanelSummary-content': {
        order: 1,
        zIndex: 1,
        '&.Mui-expanded': {
          margin: '12px 0',
        }
      },
      '& .MuiExpansionPanelSummary-expandIcon': {
        margin: 0,
        zIndex: 1,
        padding: '0 6px 0 0',
        '&.Mui-expanded': {
          transform: 'none'
        }
      },
    },
    '& .MuiExpansionPanelSummary-root::before': {
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
    '& .MuiExpansionPanelDetails-root': {
      display: 'block'
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
    setIsExpanded(expanded)
    //clean up
    return () => {}
  },[expanded])

  // alert parent component that this faq's expanded state has changed
  useEffect(() => {
    if(clickHandler){
      clickHandler(index,isExpanded)
    }
    //clean up
    return () => {}
  },[isExpanded])

  // toggle this faq
  const handleChange = () => {
    // console.log("isExpanded",isExpanded)
    setIsExpanded(prev => !prev)
  }

  const trackClick = (e) => {
    // about to be expanded
    if(!isExpanded){
      const location = window.location.pathname.replace(/\//g,"-")
      trackEvent({
        prop41: `BioBank|AccordianExpand|FAQ${location}-${index + 1}`,
        events: 'event72'
      })
    }
  }


  return (
    <ExpansionPanel square expanded={isExpanded} onChange={handleChange} className={classes.root}>
      <ExpansionPanelSummary expandIcon={isExpanded ? <RemoveRounded /> : <AddRounded />} onClick={trackClick} aria-controls={`faq-${index}-content`} id={`faq-${index}-header`}>
        <Typography variant="h4" component="h4">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <RenderContent source={desc} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default FAQ