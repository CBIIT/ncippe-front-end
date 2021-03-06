import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  AddRounded as PlusIcon,
  RemoveRounded as MinusIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import FAQ from '../FAQ'

const useStyles = makeStyles( theme => ({
  faq_title: {
    
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    '& h3': {
      flexGrow: 1,
    }
  },
  faq_icon: {
    marginLeft: -8,
    marginRight: 4
  },
  whiteBG: {
    minWidth: 148,
    margin: theme.spacing(1, 0, 0, 0),
    backgroundColor: theme.palette.common.white,
    whiteSpace: 'nowrap',
    
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0, 2),
    }
  }
}),{name: 'FAQ_Group'})

/**
 * Create a group of frequent asked question accordions that can all be toggled together
 */
const FAQs = (props) => {
  const { title, faqs, className, ...other } = props
  const classes = useStyles()
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
      <div className={classes.faq_title}>
        <Typography variant="h2" component="h3">{title}</Typography>
        <Button className={classes.whiteBG} variant="outlined" color="primary" onClick={toggleAll}>
          { isExpanded ? 
            <><MinusIcon className={classes.faq_icon} /> {t('buttons.collapse')}</>
            : 
            <><PlusIcon className={classes.faq_icon} /> {t('buttons.expand')}</>
          }
        </Button>
      </div>
      <Box mt={3}>
        {faqs && Object.keys(faqs).map((faq, i) => <FAQ
          key={i}
          index={i}
          title={faqs[faq].question}
          desc={faqs[faq].answer}
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
  faqs: PropTypes.object.isRequired,
  /**
   * assign a class name to this component for additional styles
   */
  className: PropTypes.string,
}

export default FAQs