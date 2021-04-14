import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import getAPI from '../../data'
import { LoginContext } from '../login/Login.context'
import RenderContent from '../utils/RenderContent'
import Status from '../Status'
import Loading from '../Loading'

const useStyles = makeStyles( theme => ({
  table: {
    minWidth: 600,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
    cursor: 'pointer',
    '& td, & th': {
      borderBottom: 'none',
      padding: theme.spacing(.5)
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  tableRowHeader: {
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'inherit'
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
  const [loginContext, dispatch] = useContext(LoginContext)
  const [messages, setMessages] = useState([])
  // const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const { uuid } = loginContext

  useEffect(() => {
    //load messages from api

    // paginated results - does not cache api calls or responses
    // getAPI.then(api => {
    //   return api.getMessages({page,limit: rowsPerPage}).then(resp => {
    //     if(resp instanceof Error) {
    //       throw resp
    //     }
    //     setMessages(resp.records)
    //     setTotalCount(parseInt(resp.totalCount))
    //   })
    // })

    getAPI.then(api => {
      return api.getMessages({uuid}).then(resp => {
        if(resp instanceof Error) {
          throw resp
        }
        setMessages(resp.reverse())
        setLoading(false)
      })
    })
    .catch(error => {
      setLoading(false)
      setError(error)
    })
  
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
  }

  const handleClose = (e) => {
    setOpen(false)
  }

  const viewMessage = (e) => {
    let row = e.target.localName === 'td' ? e.target.parentElement : e.target
    setSelected(page * rowsPerPage + parseInt(row.dataset.index))
    setOpen(true)
  }

  if(loading) {
    return <Loading />
  }

  if(error) {
    return <Status state="error" title="Server Error" message={error.message} />
  }

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={`${classes.tableRow} ${classes.tableRowHeader}`}>
                <TableCell className={classes.tableSubject}>Subject</TableCell>
                <TableCell className={classes.tableDateSent} align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message, i) => (
                <TableRow key={i} className={classes.tableRow} data-index={i} onClick={viewMessage}>
                  <TableCell className={classes.tableSubject}>{message.subject.en}</TableCell>
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
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        {selected !== false && 
          <DialogContent className="preview">
            <h3>{messages[selected].subject.en}</h3>
            <p>{moment(messages[selected].sendDate).format('MMMM Do YYYY, h:mm a')}</p>
            <hr />
            <RenderContent source={messages[selected].message.en} />
          </DialogContent>
        }
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Return to messages
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ViewMessages