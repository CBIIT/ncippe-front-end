import React, { useEffect, useState, useRef } from 'react'
import { Link } from '@reach/router'
import { useTracking } from 'react-tracking'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { 
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';

import ConditionalWrapper from '../../utils/ConditionalWrapper'

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

const StyledMenuItem = withStyles(theme => ({
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
      // fontWeight: 600
    },
    '&:focus': {
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: 'rgba(0,0,0,.08)',
      // '& a': {
      //   // color: theme.palette.common.white,
      //   fontWeight: 600
      // },
    },
  },
}))(props => <MenuItem {...props}/>)

const MenuGroup = (props) => {
  const randomNum = Math.floor(Math.random() * 1000) + 1
  const { id = randomNum} = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [popperClass, setPopperClass] = useState(false)
  const anchorRef = useRef(null)
  const containerNode = document.querySelector("#root .transitionGroup")
  const { trackEvent } = useTracking()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
    setPopperClass(prev => !prev ? 'active-popper' : false)
    trackEvent({
      prop53: `BioBank_TopNav|${props.title}`,
      eVar53: `BioBank_TopNav|${props.title}`,
      events:'event26',
      eventName: 'ToggleMenuReveal'
    })
  }

  const handleClose = event => {
    if (event.target.classList.contains("Mui-selected") || anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    if(event.currentTarget !== window.document) {
      trackEvent({
        prop53: `BioBank_TopNav|${props.title}|${event.target.textContent}`,
        eVar53: `BioBank_TopNav|${props.title}|${event.target.textContent}`,
        events:'event28',
        eventName: 'ToggleMenuLink'
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

  const loc = window.location.pathname

  // return focus to the button when we transitioned from !open -> open
  // this does not work when clicking from one menu item to the next
  const prevOpen = useRef(open)
  useEffect(() => {
    // check if another MenuGroup was clicked on
    const activePoppers = document.querySelectorAll(".active-popper")

    if (prevOpen.current === true && open === false && activePoppers.length < 2) {
      anchorRef.current.focus()
    }

    prevOpen.current = open;
  }, [open])

  return (
    <>
    <Button
      ref={anchorRef}
      aria-controls={`menu-list-grow-${id}`}
      aria-haspopup="true"
      onClick={handleToggle}
      className={props.active ? `${classes.active} active` : classes.button}
    >
      {props.title}
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
          <Paper id={`menu-list-grow-${id}`} elevation={1} square={true}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList className={classes.menuList} autoFocusItem={open} onKeyDown={handleListKeyDown}>
                {
                  React.Children.map(props.children, child => (
                    <StyledMenuItem onClick={handleClose} onKeyDown={handleListItemKeyDown} onMouseOver={focusItem} selected={loc === child.props.href}>
                      <ConditionalWrapper
                        condition={loc !== child.props.href}
                        wrapper={children => <Link to={child.props.href}>{children}</Link>}
                      >
                        {child.props.children}
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

export default MenuGroup