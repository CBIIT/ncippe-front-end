import React, { useEffect, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import getAPI from '../../data'

const useStyles = makeStyles( theme => ({
  table: {
    minWidth: 600,
  },
}),{name: 'ViewMessages'})

const ViewMessages = (props) => {
  const classes = useStyles()
  const [messages, setMessages] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    //load messages from api
    getAPI.then(api => {
      return api.getMessages().then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        setMessages(resp)
      })
    })
    .catch(error => {
      setError(error)
    })
  },[])

  return (
    <Box>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell align="center">Sent to</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell align="left">{message.subject}</TableCell>
              <TableCell align="center">{message.audiences.join(', ')}</TableCell>
              <TableCell align="right">{moment(message.date).format('M/D/YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

export default ViewMessages