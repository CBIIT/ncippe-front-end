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
      backgroundImage: theme.gradients.primaryDiagonal,
      padding: '0 12px',

      '&.Mui-expanded': {
        margin: 0,
        minHeight: '0 !important',
      },
      '& .MuiExpansionPanelSummary-content': {
        order: 1,
        '&.Mui-expanded': {
          margin: '12px 0',
        }
      },
      '& .MuiExpansionPanelSummary-expandIcon': {
        margin: 0,
        padding: '0 6px 0 0',
        '&.Mui-expanded': {
          transform: 'none'
        }
      },
    },
    '& .MuiExpansionPanelDetails-root': {
      display: 'block'
    }
  }
}))

const FAQ = (props) => {
  const { title, desc, expanded = true } = props
  const classes = useStyles()
  const [isExpanded, setIsExpanded] = useState(true)

  // externally control the expansion of this component
  useEffect(() => {
    if(expanded > 0) {
      setIsExpanded(false)
    }
    //clean up
    return () => {}
  },[expanded])

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