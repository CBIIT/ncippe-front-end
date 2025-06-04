import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionDetails, AccordionSummary, Typography , useTheme} from '@mui/material'
import { 
  AddRounded,
  RemoveRounded
} from '@mui/icons-material'
import PubSub from 'pubsub-js'

import RenderContent from '../../components/utils/RenderContent'
import './FAQ.css'

/**
 * Create frequent asked question accordions
 */
const FAQ = ({ index = Math.floor(Math.random() * 1000) + 1, title, desc, expanded = false, onClick }) => {
  const theme = useTheme()
  const randomNum = Math.floor(Math.random() * 1000) + 1
  //const { index = randomNum, title, desc, expanded = false, onClick } = props
  const [isExpanded, setIsExpanded] = useState(false)

  const faqAccordionSx = (theme) => ({
    my: 3,
    '&.Mui-expanded': {
      my: 3,
    },
    '& .MuiAccordionSummary-root': {
      position: 'relative',
      backgroundImage: theme.gradients?.primaryDiagonal || 'linear-gradient(to right, #f8f9fa, #eef1f5)',
      px: 2,
      py: 1,
      alignItems: 'center',
      minHeight: 64,
      '&.Mui-expanded': {
        minHeight: 64,
      },
      '& .MuiAccordionSummary-content': {
        margin: 0,
        alignItems: 'center',
      },
      '& .MuiAccordionSummary-expandIcon': {
        color: theme.palette.grey[900],
        marginTop: 0,
        marginRight: theme.spacing(1),
        '& svg': {
          fontSize: '1.5rem',
          stroke: theme.palette.grey[900],
        },
      },
    },
    '& .MuiAccordionDetails-root': {
      px: 2,
      py: 1,
      '& > p': {
        marginBottom: 2,
      },
      '& > p:last-of-type': {
        marginBottom: 0,
      },
    },
    '&::before': {
      display: 'none', // Hide default MUI divider line
    }
  })

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
    <Accordion square expanded={isExpanded} onChange={handleChange}  elevation={25}
    sx={faqAccordionSx(theme)} >
      <AccordionSummary expandIcon={isExpanded ? <RemoveRounded /> : <AddRounded />} onClick={trackClick} aria-controls={`faq-${index}-content`} id={`faq-${index}-header`}>
        <Typography variant="h4" component="h4">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">
          <RenderContent children={desc} />
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