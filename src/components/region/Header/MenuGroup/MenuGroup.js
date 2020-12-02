import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from '@reach/router'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { 
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core'

import ConditionalWrapper from '../../../utils/ConditionalWrapper'
import { trackFallback } from '../../../../utils/utils'

const useStyles = makeStyles(theme => ({
  popper: {
    position: "fixed",
    zIndex: -1
  },
  button: {
    borderRadius: 0,
    fontWeight: 'normal',
  },
  active: {
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
    marginTop: 5,
    fontWeight: 'bold',
  },
  activePopper: {
    zIndex: '10 !important'
  },
  menuList: {
    padding: 0,
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
}))

export const StyledMenuItem = withStyles(theme => ({
  root: {
    borderBottom: `1px solid #ccc`,
    padding: 0,

    '&:last-child': {
      borderBottom: 'none'
    },
    '& a': {
      flexGrow: 1,
      color: theme.palette.common.black,
      textDecoration: 'none',
      padding: '6px 16px',
    },
    '&:focus': {
      backgroundColor: 'rgba(0,0,0,.08)',
    },
  },
}))(props => <MenuItem {...props}/>)

const MenuGroup = (props) => {
  const classes = useStyles()
  const randomNum = Math.floor(Math.random() * 1000) + 1
  // destructure props
  const { index = randomNum, title, active, trackEvent = trackFallback} = props
  
  const [open, setOpen] = useState(false)
  const [popperClass, setPopperClass] = useState(false)
  const anchorRef = useRef(null)
  const containerNode = document.querySelector("#root .transitionGroup")

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
    setPopperClass(prev => !prev ? classes.activePopper : false)
    trackEvent("toggle menu reveal",{title})
  }

  const handleClose = (event) => {
    if (event.target.classList.contains("Mui-selected") || (anchorRef.current && anchorRef.current.contains(event.target))) {
      return
    }

    if(event.currentTarget !== window.document) {
      trackEvent("toggle menu link", {
        title,
        textContent: event.target.textContent
      })
    }

    setOpen(false)
    setPopperClass(false)
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
      setPopperClass(false)
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

  const location = useLocation().pathname

  // return focus to the button when we transitioned from !open -> open
  // this does not work when clicking from one menu item to the next
  const prevOpen = useRef(open)
  useEffect(() => {
    // check if another MenuGroup was clicked on
    const activePoppers = document.querySelectorAll('[class*="active-popper"]')

    if (prevOpen.current === true && open === false && activePoppers.length < 2) {
      anchorRef.current.focus()
    }

    prevOpen.current = open;
  }, [open])

  return (
    <>
    <Button
      ref={anchorRef}
      aria-controls={`menu-list-grow-${index}`}
      aria-haspopup="true"
      onClick={handleToggle}
      className={active ? `${classes.active} active` : classes.button}
    >
      {title}
    </Button>
    <Popper 
      className={`${classes.popper} ${popperClass}`} 
      open={open} 
      anchorEl={anchorRef.current} 
      keepMounted 
      transition 
      placement="bottom-start" 
      container={containerNode}
      modifiers={{
        // keepTogether: { enabled: true}
        preventOverflow: {
          boundariesElement: 'viewport',
          escapeWithReference: true,
        },
      }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: 'left top' }}
        >
          <Paper id={`menu-list-grow-${index}`} elevation={1} square={true}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList className={classes.menuList} autoFocusItem={open} onKeyDown={handleListKeyDown}>
                {
                  React.Children.map(props.children, child => (
                    <StyledMenuItem onClick={handleClose} onKeyDown={handleListItemKeyDown} onMouseOver={focusItem} selected={location === child.props.href} className={child.props.className}>
                      <ConditionalWrapper
                        condition={location !== child.props.href}
                        wrapper={children => <Link to={child.props.href}>{children}</Link>}
                      >
                        <span>{child.props.children}</span>
                      </ConditionalWrapper>
                    </StyledMenuItem>
                  ))
                }
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
    </>
  )
}

MenuGroup.displayName = 'MenuGroup'
MenuGroup.propTypes = {
  /**
   * unique index of this menu group
   */
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /**
   * the text for the top level menu button
   */
  title: PropTypes.string.isRequired,
  /**
   * sets the active state for this menu
   */
  active: PropTypes.bool,
  /**
   * menu items that are anchor elements
   */
  children: PropTypes.node.isRequired,
  /**
   * callback event for analytics tracking
   */
  trackEvent: PropTypes.func
}

export default MenuGroup