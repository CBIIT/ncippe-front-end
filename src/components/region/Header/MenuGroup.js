import React, { useEffect, useState, useRef } from 'react'
import { Link } from '@reach/router'
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

const useStyles = makeStyles(theme => ({
  popper: {
    position: "fixed",
  },
  button: {
    borderRadius: 0
  },
  active: {
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    borderRadius: 0,
    marginTop: 5,
  }
}))

const StyledMenuList = withStyles(theme => ({
  root: {
    '& a': {
      color: theme.palette.common.black,
      textDecoration: 'none'
    },
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& a': {
        color: theme.palette.common.white,
        fontWeight: 600
      },
    },
  },
}))(props => <MenuList {...props}/>)

const StyledMenuItem = withStyles(theme => ({
  root: {
    '& a': {
      color: theme.palette.common.black,
      textDecoration: 'none'
    },
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& a': {
        color: theme.palette.common.white,
        fontWeight: 600
      },
    },
  },
}))(props => <MenuItem {...props}/>)

const MenuGroup = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [popperClass, setPopperClass] = useState(false)
  const anchorRef = useRef(null)
  const containerNode = document.querySelector("#root .transitionGroup")

  const handleToggle = (event) => {
    console.log("Toggle open")
    setOpen(prevOpen => !prevOpen);
    setPopperClass(prev => !prev ? 'active-popper' : false)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
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
      aria-controls="menu-list-grow"
      aria-haspopup="true"
      onClick={handleToggle}
      className={props.active ? classes.active : classes.button}
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
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: 'left top' }}
        >
          <Paper className="menu-list-grow" elevation={1} square={true}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                {
                  React.Children.map(props.children, child => <StyledMenuItem onClick={handleClose} onKeyDown={handleListItemKeyDown}><Link to={child.props.href}>{child.props.children}</Link></StyledMenuItem>)
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