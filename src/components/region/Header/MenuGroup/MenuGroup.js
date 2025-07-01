import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate,Link, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { 
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  useTheme
} from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import PubSub from 'pubsub-js'
import './MenuGroup.css'
import ConditionalWrapper from '../../../utils/ConditionalWrapper'

// Popper with conditional active styling
// assume theme.zIndex.appBar = 1100 (default value)
const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.appBar + 1,
}));

// MenuList styling
const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: 0,
  '& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover': {
    backgroundColor: theme.palette.navy.dark,
    color: theme.palette.common.white,
    fontWeight: 600,
    padding: '6px 0px',
    '& a': {
      color: theme.palette.common.white,
    },
  },
}));
 const StyledMenuButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  fontWeight: 'normal',
  marginLeft: 6,
  marginRight: 6,

  '&.active': {
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    fontWeight: 'bold',
    padding: '6px 0px 6px 2px',
    marginTop: 5,
  },
}));

 const StyledMenuItem = styled(MenuItem)(({theme }) => ({
  borderBottom: `1px solid #ccc`,
  padding: 0,

  '&:last-child': {
      borderBottom: 'none'
  },
  '& span': {
    display: 'inline-block',
    padding: '6px 16px',
    width: '100%',
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
  }))

/**
 * Dropdown navigation menu component used in the top level global navigation on desktop
 * 
 * The active menu item is dynamically selected based on the app's location matching a child's `href`
 */
const MenuGroup = ( { index = (Math.floor(Math.random() * 1000) + 1), menuText, active, children }) => {
  //const randomNum = Math.floor(Math.random() * 1000) + 1
  // destructure props
  //const { index = randomNum, menuText, active } = props  
  const [open, setOpen] = useState(false)
  const [popperClass, setPopperClass] = useState(false)
  const anchorRef = useRef(null)
  const location = useLocation().pathname
  const containerNode = document.querySelector("#root .transitionGroup")

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
    setPopperClass(true);
    PubSub.publish('ANALYTICS', {
      eventName: 'ToggleMenuReveal',
      events:'event26',
      prop53: `BioBank_TopNav|${menuText}`,
      eVar53: `BioBank_TopNav|${menuText}`,
    })
  }

  const handleClose = (event) => {
    // if (event.target.classList.contains("Mui-selected") || (anchorRef.current && anchorRef.current.contains(event.target))) {
    //   return
    // }

    if  (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
    //setPopperClass(false)
  }
  
  const handleMenuItemClick = () => {
    setOpen(false)
   // setPopperClass(false)
    PubSub.publish('ANALYTICS', {
        eventName: 'ToggleMenuLink',
        events:'event28',
        prop53: `BioBank_TopNav|${menuText}`,
        eVar53: `BioBank_TopNav|${menuText}`,
    })
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
      setPopperClass(false)
    }
  }

  const handleListItemKeyDown = (event, child) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setOpen(false)
      anchorRef.current?.focus()
    }
  }

  const focusItem = (event) => {
    event.currentTarget.focus()
  }

  // return focus to the button when we transitioned from !open -> open
  // this does not work when clicking from one menu item to the next
  const prevOpen = useRef(open)
  useEffect(() => {
    // check if another MenuGroup was clicked on
    const activePoppers = document.querySelectorAll('[class*="active-popper"]')
    if (prevOpen.current === true && open === false && activePoppers.length < 2) {
      anchorRef.current?.focus()
    }
    prevOpen.current = open;
  }, [open])

  return (
    <>
    <StyledMenuButton
      ref={anchorRef}
      aria-controls={open ? `menu-list-grow-${index}`: undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      className={active ? 'active' : ''}
      endIcon={<ArrowDropDown />}
    >
      {menuText}
    </StyledMenuButton>
    <StyledPopper 
      className={popperClass ? 'active-popper' : ''} 
      open={open} 
      anchorEl={anchorRef.current} 
      role={undefined}
      disablePortal 
      transition 
      placement="bottom-start" 
      // container={containerNode}
      modifiers={[
        {
          name: 'preventOverflow',
          options: {
            boundary: 'viewport',
            altAxis: true
          },
        }
      ]}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: 'left top'  }}
        >
          <Paper id={`menu-list-grow-${index}`} elevation={1} square={true}>
            <ClickAwayListener onClickAway={handleClose}>
              <StyledMenuList autoFocusItem={open}
              onKeyDown={(e) => e.key === 'Tab' && setOpen(false)} >
                {
                  React.Children.map(children, (child, i) =>{ 
                    //const isSelected = location === child.props.href;
                    const href = child.props.to || child.props.href;

                      if (!href) {
                        console.warn('MenuGroup child missing href/to:', child);
                        return null;
                      }
                    //console.log("MenuGroup clicked:", href);
                    if (React.isValidElement(child) && typeof href === 'string') {
                    return (
                    
                    <StyledMenuItem  component={Link} 
                     to={href}
                        onClick={handleMenuItemClick}
                        style={{ textDecoration: 'none' }}
                    onKeyDown={(e) => handleListItemKeyDown(e, child)}
                    onMouseOver={focusItem}
                    selected={location === href} >
                     
                        <span>{child.props.children}</span>
                  
                    </StyledMenuItem>
                   
                  )}
                  else{
                    console.warn('Invalid child in MenuGroup or ExpansionMenu:', child);
                    return null;
                  }
                }
                )
                }
              </StyledMenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </StyledPopper>
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
   * text for the top level menu button
   */
  menuText: PropTypes.string.isRequired,
  /**
   * sets the active state for this menu
   */
  active: PropTypes.bool,
  /**
   * menu items that are anchor elements
   */
  children: PropTypes.node.isRequired,
}

export default MenuGroup