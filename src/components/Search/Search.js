import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { Button, Dialog, Paper, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Search as SearchIcon,
  Clear as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'

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
      maxWidth: 1000,
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

/**
 * Site Search component seen in the common header nav
 * 
 * This component presents the search icon and the input field, but does not perform the site search business logic. That is handled in the SearchResultsPage.js
 */
const Search = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { trackEvent } = useTracking()
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
    trackEvent({
      prop53: 'BioBank_TopNav|Search',
      eVar53: 'BioBank_TopNav|Search',
      events: 'event26',
      eventName: 'TopNavSearch'
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // send the search terms to the search results page
    const searchTerm = e.target.siteSearch.value
    trackEvent({
      prop11: "BioBank Global Search",
      eVar11: "BioBank Global Search",
      eVar13: "+1",
      prop14: searchTerm,
      eVar14: searchTerm,
      events: "event2",
      eventName: 'GlobalSearch'
    })
    navigate(`/search`,{state: {
      term: searchTerm
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
          inputProps={ // attributes applied to the input element
            { 'aria-label': t('search.input_placeholder') } 
          }
          InputProps={ // props applied to the Input component
            { startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }
          }
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