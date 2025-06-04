import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, MenuList, MenuItem, Typography, useTheme } from '@mui/material'
import { 
  ExpandMore,
  AddRounded,
  RemoveRounded,
} from '@mui/icons-material'

const rootSx = {
  '&.Mui-expanded': {
    margin: 'auto',
  },
};

const accordionSummarySx = {
  '& .MuiAccordionSummary-content': {
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
};

const accordionDetailsSx = {
  padding: 0,
};

const floatingSx = theme => ({
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
  '& .MuiAccordionSummary-root.Mui-expanded': {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    minHeight: '0 !important',
  },
  '& .MuiAccordionSummary-expandIcon': {
    color: theme.palette.primary.main,
  }
});

const stackedSx = theme => ({
  '& .MuiAccordionSummary-root': {
    padding: '0 12px',
    '&.Mui-expanded': {
      minHeight: '48px',
      backgroundColor: theme.palette.primary.light,
    },
    '& .MuiAccordionSummary-content': {
      order: 1,
    },
    '& .MuiAccordionSummary-expandIcon': {
      margin: 0,
      padding: '0 6px 0 0',
      '&.Mui-expanded': {
        transform: 'none',
      },
    },
  },
  '&::before': {
    height: 2,
    top: -2,
  },
  '&.Mui-expanded': {
    '&::before': {
      opacity: 1,
    },
    '& + .MuiAccordion-root::before': {
      display: 'block',
    },
  },
  '& .MuiList-root': {
    '& li': { padding: 0 },
    '& a': {
      color: theme.palette.common.black,
      textDecoration: 'none',
      flexGrow: 1,
      padding: '6px 0px',
    },
    '& .Mui-selected,& .Mui-selected:focus,& .Mui-selected:hover': {
      backgroundColor: theme.palette.navy.dark,
      color: theme.palette.common.white,
      fontWeight: 600,
      padding: '6px 0px',
      '& a': {
        color: theme.palette.common.white,
      },
    },
    '& .MuiMenuItem-root': {
      // This will be the base padding for *all* menu items
      // It should be enough to create the desired 'un-indented' look for the selected item
      // and allow more padding for the indented items.
      // Let's assume you want indented items to be 32px in.
      paddingLeft: '0px', // This is the base padding, which will be overridden for selected
    },
    '& .MuiMenuItem-root.Mui-selected': { // Target the selected MenuItem
      // Reset padding to match the AccordionSummary content's initial padding
      
      paddingLeft: '0px', // Align selected item with summary/header
      backgroundColor: theme.palette.navy.dark,
      color: theme.palette.common.white,
      fontWeight: 600,
    },
    // To ensure the actual 'a' tag's padding inside the selected MenuItem
    // doesn't add extra space on top of the MuiMenuItem-root padding:
    '& .MuiMenuItem-root.Mui-selected a': {
      paddingLeft: '0px', // Prevent 'a' from adding its own left padding
      paddingRight: '0px', // Prevent 'a' from adding its own right padding
    },
    // For non-selected items, ensure 'a' tag padding works with the MuiMenuItem-root padding
    '& .MuiMenuItem-root:not(.Mui-selected) a': {
      paddingLeft: '0px', // Remove 'a' tag's left padding, already handled by MuiMenuItem-root
      paddingRight: '0px', // You can adjust this if needed
    },
  }
});


/**
 * This component will display a drop down menu of links. It has two styles: `stacked` and `floating`. The stacked menu variant is currently only used for the mobile menu navigation. The floating menu variant is used in various places for user interaction
 */
const ExpansionMenu = ({
  index = `panel-${Math.floor(Math.random() * 1000) + 1}`,
  menuText,
  className = '',
  expanded = false,
  active = false,
  handleClick,
  variant = 'stacked',
  children,
}) => {

  const location = useLocation()
  const theme = useTheme()
  
  const [isExpanded, setIsExpanded] = useState(expanded)
  const ExpandIcon = variant !== 'stacked' ? ExpandMore : AddRounded
  const CollapseIcon = variant !== 'stacked' ? ExpandMore : RemoveRounded
  const loc = location.pathname
   console.log('current loc:', loc);

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
      sx={[
        rootSx,
        variant === 'floating' ? floatingSx(theme) : stackedSx(theme),
      ]}
    >
      <AccordionSummary 
        sx={accordionSummarySx}
        expandIcon={isExpanded ? <CollapseIcon /> : <ExpandIcon />}
        aria-controls={`${index}Menu--content`}
        id={`${index}Menu--header`}
      >
        <Typography variant="h4">{menuText}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={accordionDetailsSx}>
        <MenuList sx={{ p: 0, width: '100%' }}  autoFocusItem={isExpanded} 
        data-panelgroup={menuText}>
          {
            React.Children.map(children, (child) => {
              const href = child.props.to || child.props.href;
             
              if(React.isValidElement(child) && href) {
                 const isSelected = location.pathname === href;
                 
                return (
                      <MenuItem component={Link} onClick={child.props.onClick} 
                      to={href} style={{ textDecoration: 'none', width: '100%' }}
                      onKeyDown={handleListItemKeyDown} 
                      onMouseOver={focusItem} 
                      selected={isSelected}  
                      className={child.props.className}>
                   
                      {child.props.children}
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

ExpansionMenu.displayName = 'ExpansionMenu'
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
  children: PropTypes.node.isRequired,
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

export default ExpansionMenu