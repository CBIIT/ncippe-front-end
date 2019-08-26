import React, { useContext, useState } from 'react'
// import { Card, CardContent, Typography, Dialog, Button, Zoom } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { LoginContext } from '../../components/login/SharedLogin/Login.context'

import NotificationItem from './NotificationItem'

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(3, 0)
  }
}))

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Zoom ref={ref} {...props} />;
// });


const Notifications = () => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  const {notificationList} = loginContext
  const count = notificationList ? notificationList.length : 0
  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // }

  // const handleClose = () => {
  //   setOpen(false);
  // }
  return (
    <>
    <Typography variant="h2" className={classes.header}>
      You have {count} Notification{count !== 1 && 's'}
    </Typography>
    {count && notificationList.map((item, i) => <NotificationItem notification={item} />)}
    {/* <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      Here are your Notifications
      <Button variant="text" onClick={handleClose}>Close</Button>
    </Dialog> */}
    </>
  )
}

export default Notifications