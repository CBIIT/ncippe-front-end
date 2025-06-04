import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, Paper, IconButton, InputAdornment, TextField } from '@mui/material'
import { 
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'

/**
 * Site Search component seen in the common header nav
 * 
 * This component presents the search icon and the input field, but does not perform the site search business logic. That is handled in the SearchResultsPage.js
 */
const Search = () => {
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true)
    PubSub.publish('ANALYTICS', {
      events: 'event26',
      eventName: 'TopNavSearch',
      prop53: 'BioBank_TopNav|Search',
      eVar53: 'BioBank_TopNav|Search',
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // send the search terms to the search results page
    const searchTerm = e.target.siteSearch.value
    PubSub.publish('ANALYTICS', {
      events: "event2",
      eventName: 'GlobalSearch',
      prop11: "BioBank Global Search",
      eVar11: "BioBank Global Search",
      eVar13: "+1",
      prop14: searchTerm,
      eVar14: searchTerm,
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
      <IconButton
        sx={{'& svg': {fontSize: '2rem',},
        }}
        aria-label="open search"
        onClick={handleClickOpen}
        size="large">
        <SearchIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} sx={{ '& .MuiDialog-paper': { width: '70%', maxWidth: 1000,
      },
    }}>
        <Paper component="form" sx={{
      display: 'flex',
      flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    px: 3,
    py: 2,
    '& > *': {
      mx: 1
    }
  }} onSubmit={handleSubmit}>
          <TextField
            id="siteSearch"
            autoFocus
            sx={{ flexGrow: 1 }}
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
  );
}

export default Search