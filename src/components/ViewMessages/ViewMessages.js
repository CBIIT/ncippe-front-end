import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import getAPI from '../../data'
import { LoginContext } from '../login/Login.context'
import RenderContent from '../utils/RenderContent'
import Status from '../Status'
import Loading from '../Loading'
import NoItems from '../NoItems'

const ViewMessages = () => {
  const [loginContext] = useContext(LoginContext)
  const { t } = useTranslation(['a_messageHistory'])
  // const [allMessages, setAllMessages] = useState([])
  const [messages, setMessages] = useState([]) // to be filtered by user
  // const [viewAll, setViewAll] = useState(false)
  // const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const { uuid } = loginContext

  const recipientTypes = {
    ROLE_PPE_CRC: 'Clinical Research Associates',
    ROLE_PPE_PROVIDER: 'Providers',
    ROLE_PPE_PARTICIPANT: 'Participants'
  }

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
        if(resp instanceof Error || resp?.error) {
          throw resp
        }
        // setAllMessages(resp.reverse())
        setMessages(resp.reverse())
        setLoading(false)
      })
    })
    .catch(error => {
      setLoading(false)
      setError(error)
    })
  
  },[uuid])

  // useEffect(()=>{
  //   if(viewAll) {
  //     setMessages(allMessages)
  //   } else {
  //     setMessages(prev => allMessages.filter(message => message.messageFrom?.userUUID === uuid))
  //   }
  // },[allMessages, viewAll, uuid])

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

  const niceAudienceNames = (audiences) => {
    const niceNames = audiences.map(key => recipientTypes[key])
    return niceNames.join(', ')
  }

  // const handleSwitchChange = (e) => setViewAll(e.target.checked)

  if(loading) {
    return <Loading />
  }

  if(error) {
    if(error?.error) {
      return <NoItems message={error.error} />
    } else {
      return <Status state="error" title="Server Error" message={error.message} />
    }
  }


  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* <Box className={classes.tableOptions}>
        <Typography component="span">{t('switch.mine')}</Typography>
        <FormControlLabel
          control={<Switch color="primary" checked={viewAll} onChange={handleSwitchChange} />}
          label={t('switch.all')}
        />
      </Box> */}
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  borderBottom: 1,
                  borderColor: 'divider',
                  px: 2,
                  py: 1.5,
                  cursor: 'default',
                  '&:hover': { backgroundColor: 'inherit' },
                  '& td, & th': {
                    borderBottom: 'none',
                    py: 1,
                  },
                }}>
                <TableCell sx={{ gridRow: 1, fontWeight: 'bold' }}>{t('tableCols.subject')}</TableCell>
                <TableCell sx={{ gridRow: '1/4' }} align="right">{t('tableCols.date')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message, i) => (
                <TableRow key={i} sx={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      borderBottom: 1,
                      borderColor: 'divider',
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      '& td, & th': {
                        borderBottom: 'none',
                        py: 1,
                      },
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }} data-index={i} onClick={viewMessage}>
                  <TableCell sx={{ gridRow: 1, fontWeight: 'bold' }}>{message.subject.en}</TableCell>
                  {message.audiences && <TableCell sx={{ gridRow: 2 }}>{t('message.sentTo')}: {niceAudienceNames(message.audiences)}</TableCell>}
                  {/* {viewAll && <TableCell className={classes.tableMessageFrom}>{t('message.sentBy')}: <a href={`mailto:${message.messageFrom.email}`}>{message.messageFrom.firstName} {message.messageFrom.lastName}</a></TableCell>} */}
                  {/* {viewAll && <TableCell className={classes.tableMessageFrom}>{t('message.sentBy')}: {message.messageFrom.firstName} {message.messageFrom.lastName} &lt;{message.messageFrom.email}&gt;</TableCell>} */}
                  <TableCell align="right" sx={{ gridRow: '1/4'}}>{moment(message.dateSent).format('M/D/YYYY')}</TableCell>
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        {selected !== false && 
          <DialogContent className="preview">
            <h3>{messages[selected].subject.en}</h3>
            <p>{moment(messages[selected].dateSent).format('MMMM Do YYYY, h:mm a')}</p>
            <hr />
            <RenderContent children={messages[selected].message.en} />
          </DialogContent>
        }
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose}>
            {t('button.return')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewMessages