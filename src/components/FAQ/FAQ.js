import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  AddRounded,
  RemoveRounded
} from '@material-ui/icons'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import './FAQ.css'

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
      display: 'block',
      '& > p': {
        marginBottom: 16
      },
      '& > p:last-child': {
        marginBottom: 0
      }
    }
  },
  panelDetails: {
    '& p:last-child': {
      marginBottom: 0
    }
  }
}),{name: 'FAQ'})

/**
 * Create frequent asked question accordions
 */
const FAQ = (props) => {
  const classes = useStyles()
  const randomNum = Math.floor(Math.random() * 1000) + 1
  const { index = randomNum, title, desc, expanded = false, onClick } = props
  const [isExpanded, setIsExpanded] = useState(false)

  // externally control the expansion of this component
  useEffect(() => {
    setIsExpanded(() => {
      if(onClick){
        onClick(index,expanded)
      }
      return expanded
    })
  },[expanded, onClick, index])

  // toggle this faq
  const handleChange = () => {
    setIsExpanded(prev => {
      // alert parent component that this faq's expanded state has changed
      if(onClick){
        onClick(index,!prev)
      }
      // toggle state value
      return !prev
    })
  }

  const trackClick = () => {
    // about to be expanded
    if(!isExpanded){
      const pageName = window.location.pathname.replace(/\//g,"-")
      PubSub.publish('ANALYTICS', {
        events: 'event72',
        eventName: 'FAQ',
        prop41: `BioBank|AccordianExpand|FAQ${pageName}-${index}`,
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

FAQ.displayName = 'FAQ'
FAQ.propTypes = {
  /**
   * unique index of this FAQ item
   */
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * text that appears in the FAQ header
   */
  title: PropTypes.string.isRequired,
  /**
   * expanded content of this FAQ item as text, html or markdown
   */
  desc: PropTypes.string.isRequired,
  /**
   * sets the expanded state of the accordion
   */
  expanded: PropTypes.bool,
  /**
   * callback event on click of the FAQ header
   */
  onClick: PropTypes.func,
}

export default FAQ