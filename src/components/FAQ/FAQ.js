import React, { useEffect, useState } from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  AddRounded,
  RemoveRounded
} from '@material-ui/icons'
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
    '& .Mui-expanded::before': {
      animation: 'whiteToTransparent 300ms',
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
    setIsExpanded(prev => !prev)
  }


  return (
    <ExpansionPanel square expanded={isExpanded} onChange={handleChange} className={classes.root}>
      <ExpansionPanelSummary expandIcon={isExpanded ? <RemoveRounded /> : <AddRounded />}>
        <Typography variant="h4" component="h4">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <RenderContent source={desc} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default FAQ