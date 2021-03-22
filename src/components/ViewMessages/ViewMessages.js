import React, { useEffect, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import getAPI from '../../data'

const useStyles = makeStyles( theme => ({
  table: {
    minWidth: 600,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    padding: theme.spacing(1.5),
    '& td, & th': {
      borderBottom: 'none',
      padding: theme.spacing(.5)
    }
  },
  tableSubject: {
    gridRow: 1,
    fontWeight: 'bold'
  },
  tableAudience: {
    gridRow: 2,
    fontWeight: 'normal'
  },
  tableDateSent: {
    gridRow: 1/3
  }

}),{name: 'ViewMessages'})

const ViewMessages = (props) => {
  const classes = useStyles()
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableSubject}>Subject</TableCell>
                <TableCell className={classes.tableDateSent} align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message) => (
                <TableRow key={message.id} className={classes.tableRow}>
                  <TableCell className={classes.tableSubject}>{message.subject}</TableCell>
                  <TableCell className={classes.tableAudience}>{message.audiences.join(', ')}</TableCell>
                  <TableCell align="right" className={classes.tableDateSent}>{moment(message.dateSent).format('M/D/YYYY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={messages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
  )
}

export default ViewMessages