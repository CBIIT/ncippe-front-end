import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Container, Typography, useTheme } from '@mui/material'
import { 
  AddRounded as PlusIcon,
  RemoveRounded as MinusIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import FAQ from '../FAQ'


/**
 * Create a group of frequent asked question accordions that can all be toggled together
 */
const FAQs = (props) => {
  const { title, faqs, className, ...other } = props
  const theme = useTheme()
  const { t } = useTranslation('common')
  const [isExpanded, setIsExpanded] = useState(false)
  const [toggleState,setToggleState] = useState([])

  const toggleAll = () => {
    setIsExpanded(prev => !prev)
  }

  useEffect(() => {
    // get unique values from array
    const shouldToggle = [...new Set(toggleState)]

    // if there is only one unique value then set the `isExpanded` state
    setIsExpanded(prev => {
      return shouldToggle.length === 1 && shouldToggle[0] !== prev ? !prev : prev
    })
  }, [toggleState])

  // track which faqs are open or closed
  const trackToggle = useCallback((index,state) => {
      setToggleState(prev => {
        const newState = [...prev]
        newState[index] = state;
        return newState
      })
    },[])

  return (
    <Container className={`innerContainer ${className}`} {...other} component="section">
      <Box sx={{
          display: { sm: 'flex' },
          flexDirection: { sm: 'row' },
          alignItems: { sm: 'center' },
          mb: 2,
        }}>
        <Typography sx={{ flexGrow: 1 }} variant="h2" component="h3">{title}</Typography>
        <Button  sx={{
            minWidth: 148,
            mt: { xs: 1, sm: 0 },
            ml: { sm: 2 },
            backgroundColor: 'common.white',
            whiteSpace: 'nowrap',
          }} variant="outlined" color="primary" onClick={toggleAll}>
          { isExpanded ? 
            <><MinusIcon sx={{ mr: 0.5, ml: -1 }} /> {t('buttons.collapse')}</>
            : 
            <><PlusIcon sx={{ mr: 0.5, ml: -1 }} /> {t('buttons.expand')}</>
          }
        </Button>
      </Box>
      <Box mt={3}>
        {faqs && faqs.map((faq, i) => <FAQ
          key={i}
          index={i}
          title={faq.question}
          desc={faq.answer}
          expanded={isExpanded}
          onClick={trackToggle}
        />)}
      </Box>
    </Container>
  )
}

FAQs.displayName = 'FAQ_Group'
FAQs.propTypes = {
  /**
   * text that appears in the FAQ header
   */
  title: PropTypes.string, 
  /**
   * faq data to be rendered
   */
 // faqs: PropTypes.object.isRequired,
 /**
   * FAQ data to be rendered – now an array of objects
   */
 faqs: PropTypes.arrayOf(
  PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,  // If you're rendering React elements or HTML strings via dangerouslySetInnerHTML
    ]).isRequired,
  })
).isRequired,
  /**
   * assign a class name to this component for additional styles
   */
  className: PropTypes.string,
}

export default FAQs