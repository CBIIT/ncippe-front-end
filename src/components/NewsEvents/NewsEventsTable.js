import React, { useState } from 'react'
import { Box, Paper, Table, TableBody,Typography, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import moment from 'moment'
import Status from '../Status'

const NewsEventsTable = (props) => {
  const { data = [], totalCount = 0, error = false } = props
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
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                '&:hover': { backgroundColor: 'inherit' } }}>
                <TableCell sx={{ width:170, fontWeight: 'bold' }} >Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} >Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                <TableRow key={item.id} sx={{
                  borderBottom: theme => `1px solid ${theme.palette.divider}`,
                  '&:hover': { backgroundColor: theme => theme.palette.action.hover },
                  '& td, & th': {
                    borderBottom: 'none',
                    py: 1,
                    px: 2,
                  }
                }} data-index={i}>
                  <TableCell sx={{ width: 170 }} >{moment(item.publishedDate).format('MMMM YYYY')}</TableCell>
                  <TableCell>
                    <Typography component="a"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 500 }}
                    > 
                  {item.title} </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
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