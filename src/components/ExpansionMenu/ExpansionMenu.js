import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Accordion, AccordionDetails, AccordionSummary, MenuList, MenuItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  ExpandMore,
  AddRounded,
  RemoveRounded
} from '@material-ui/icons'

import ConditionalWrapper from '../utils/ConditionalWrapper'

const useStyles = makeStyles(theme => ({
  root: {
    '&.Mui-expanded': {
      margin: 'auto',
    }
  },
  accordionSummary: {
    '& .MuiAccordionSummary-content': {
      margin: 0,
      '&.Mui-expanded': {
        margin: 0,
      },
    },
  },
  accordionDetails: {
    padding: 0,
  },
  menuList: {
    padding: 0,
    width: '100%'
  },

  floating: {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      boxShadow: theme.shadows[4],
    },
    '& .MuiAccordionSummary-root': {
      '&.Mui-expanded': {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        minHeight: '0 !important',
      },
      '& .MuiAccordionSummary-expandIcon': {
        color: theme.palette.primary.main
      }
    }
  },

  stacked: {
    '& .MuiAccordionSummary-root': {
      padding: '0 12px',

      '&.Mui-expanded': {
        minHeight: '48px',
        backgroundColor: theme.palette.primary.light
      },
      '& .MuiAccordionSummary-content': {
        order: 1
      },
      '& .MuiAccordionSummary-expandIcon': {
        margin: 0,
        padding: '0 6px 0 0',
        '&.Mui-expanded': {
          transform: 'none'
        }
      },
    },
    '&::before': {
      height: 2,
      top: -2
    },
    '&.Mui-expanded': {
      '&::before': {
        opacity: 1
      },
      '& + .MuiAccordion-root::before': {
        display: 'block'
      }
    },
    '& .MuiList-root': {
      '& li': {
        padding: 0
      },
      '& a': {
        color: theme.palette.common.black,
        textDecoration: 'none',
        flexGrow: 1,
        padding: '6px 16px'
      },
      '& .Mui-selected,& .Mui-selected:focus,& .Mui-selected:hover': {
        backgroundColor: theme.palette.navy.dark,
        color: theme.palette.common.white,
        fontWeight: 600,
        padding: '6px 16px',
        '& a': {
          color: theme.palette.common.white,
        }
      },
    }
  }
}))

/**
 * This component will display a drop down menu of links. It has two styles: `stacked` and `floating`. The stacked menu variant is currently only used for the mobile menu navigation. The floating menu variant is used in various places for user interaction
 */
const ExpansionMenu = (props) => {
  const classes = useStyles()
  const {
    index = `panel-${Math.floor(Math.random() * 1000) + 1}`, 
    menuText,
    className = "", 
    expanded = false,
    active = false,
    handleClick,
    variant = 'stacked'
  } = props
  
  const [isExpanded, setIsExpanded] = useState(expanded)
  const ExpandIcon = variant !== 'stacked' ? ExpandMore : AddRounded
  const CollapseIcon = variant !== 'stacked' ? ExpandMore : RemoveRounded
  const loc = window.location.pathname

  useEffect(() => {
    setIsExpanded(expanded)
  },[expanded])

  const handleChange = (event, newExpanded) => {
    if(handleClick) {
      handleClick(event, newExpanded ? true : false)
    } else {
      setIsExpanded(newExpanded ? true : false)
    }
  }

  const handleListItemKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.firstChild.click()
    }
  }

  const focusItem = (event) => {
    event.currentTarget.focus()
  }

  return (
    <Accordion 
      square 
      expanded={isExpanded}
      onChange={handleChange} 
      className={`${classes.root} ${variant !== 'stacked' ? classes.floating : classes.stacked} ${className}`}
    >
      <AccordionSummary 
        className={`${classes.accordionSummary} ${active ? "active" : ""}`}
        expandIcon={isExpanded ? <CollapseIcon /> : <ExpandIcon />}
        aria-controls={`${index}Menu--content`}
        id={`${index}Menu--header`}
      >
        <Typography variant="h4">{menuText}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <MenuList className={classes.menuList} autoFocusItem={isExpanded} data-panelgroup={menuText}>
          {
            React.Children.map(props.children, child => {
              if(child && child.type === "a") {
                return (
                  <MenuItem onClick={child.props.onClick} onKeyDown={handleListItemKeyDown} onMouseOver={focusItem} selected={loc === child.props.href}  className={child.props.className}>
                    <ConditionalWrapper
                      condition={loc !== child.props.href}
                      wrapper={children => <Link to={child.props.href}>{children}</Link>}
                    >
                      <span>{child.props.children}</span>
                    </ConditionalWrapper>
                  </MenuItem>
                )
              }
              return child
            })
          }
        </MenuList>
      </AccordionDetails>
    </Accordion>
  )
}

export default ExpansionMenu
ExpansionMenu.propTypes = {
  /**
   * unique identifier used for ARIA controls connecting the button to the menu
   */
  index: PropTypes.string,
  /**
   * the text of the menu button
   */
  menuText: PropTypes.string.isRequired,
  /**
   * optional additional class name for custom styles
   */
  className: PropTypes.string,
  /**
   * The menu items
   */
  children: PropTypes.node,
  /**
   * sets if the menu is expanded or not
   */
  expanded: PropTypes.bool,
  /**
   * adds an `active` class name to the menu button for additional styling
   */
  active: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed. 
   * `function(event: object, expanded: boolean) => void`
   * _event_: The event source of the callback.
   * _expanded_: The expanded state of the accordion.
   */
  handleClick: PropTypes.func,
  /**
   * The variant to use
   */
  variant: PropTypes.oneOf(['stacked', 'floating']),
}