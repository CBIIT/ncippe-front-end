import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { Button, Dialog, Paper, IconButton, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Search as SearchIcon,
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dialog: {
    '& .MuiDialog-paper': {
      width: "70%",
      maxWidth: 'none',
    }
  },
  paper: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    padding: theme.spacing(2,3),
    '& > *': {
      margin: theme.spacing(0,1)
    }
  },
  input: {
    flexGrow: 1
  }
}));

const Search = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // send the search terms to the search results page
    navigate(`/search`,{state: {
      term: e.target.siteSearch.value
    }})
  }

  const handleChange = (e) => {
    const input = e.target.value
    if(input.length > 1) {
      setIsDisabled(false)
    } else (
      setIsDisabled(true)
    )
  }

  return (
    <>
    <IconButton className={classes.iconButton} aria-label="open search" onClick={handleClickOpen}>
      <SearchIcon />
    </IconButton>
    <Dialog onClose={handleClose} open={open} className={classes.dialog}>
      <Paper component="form" className={classes.paper} onSubmit={handleSubmit}>
        <TextField
          id="siteSearch"
          autoFocus
          className={classes.input}
          placeholder={t('search.input_placeholder')}
          inputProps={{ 'aria-label': 'search' }}
          variant="outlined"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('buttons.search')}</Button>
        <Button variant="text" color="primary" onClick={handleClose}><ClearIcon /> {t('buttons.close')}</Button>
      </Paper>
    </Dialog>
    </>
  )
}

export default Search