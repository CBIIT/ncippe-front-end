import React, { useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import Status from '../Status'

const useStyles = makeStyles( theme => ({
  table: {
    minWidth: 600,
  },
  tableRow: {
    // display: 'grid',
    // gridTemplateColumns: 'auto 1fr',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
    // cursor: 'pointer',
    '& td, & th': {
      borderBottom: 'none',
      padding: theme.spacing(.5,2)
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  tableRowHeader: {
    // cursor: 'default',
    '&:hover': {
      backgroundColor: 'inherit'
    }
  },
  // tableTitle: {
  //   gridRow: 2,
  //   fontWeight: 'bold'
  // },
  tableDate: {
    width: 170,
  }

}),{name: 'ViewMessages'})

const NewsEventsTable = (props) => {
  const { data = [], totalCount = 0, error = false } = props
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
  }

  return (
    <Box>
      {error && <Status state="error" title="Server Error" data={error.message} />}
      <Paper>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={`${classes.tableRow} ${classes.tableRowHeader}`}>
                <TableCell className={classes.tableDate}>Date</TableCell>
                <TableCell className={classes.tableTitle}>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                <TableRow key={item.id} className={classes.tableRow} data-index={i}>
                  <TableCell className={classes.tableDate}>{moment(item.publishedDate).format('MMMM YYYY')}</TableCell>
                  <TableCell className={classes.tableTitle}><a href={item.link} rel='noopener noreferrer' target="_blank">{item.title}</a></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default NewsEventsTable