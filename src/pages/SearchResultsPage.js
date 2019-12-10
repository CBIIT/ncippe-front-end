import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Box, Button, Container, InputAdornment, Link, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Search as SearchIcon
} from '@material-ui/icons'
import { searchIndex } from '../i18n'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import RenderContent from '../components/utils/RenderContent'

const useStyles = makeStyles( theme => ({
  searchForm: {
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
  },
  dim: {
    color: theme.palette.grey.medium
  }
}))

const SearchResults = (props) => {
  const {location} = props
  const classes = useStyles()
  const { t, i18n } = useTranslation('common')
  const { trackEvent } = useTracking()
  const term = location ? location.state ? location.state.term : '' : ''
  const [searchTerm, setSearchTerm] = useState(term)
  const [searchResults, setSearchResults] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  
  useEffect(() => {
    const results = processSearch(searchIndex.search(`*${searchTerm}*~1 ${searchTerm}* *${searchTerm}`))
    setSearchResults(results)

    trackEvent({
      event:'pageview',
      prop6: "Search results",
      eVar10: results.length.toString(),
      prop14: searchTerm,
      eVar14: searchTerm
    })

  }, [searchTerm, trackEvent])

  const processSearch = (results = []) => {

    const extract = (str,q) => {
      const regEx = new RegExp(q,"i")
      const match = str.search(regEx,"gi")
      if(match < 0){
        return null
      }
      if (match > 0 && match < 40) {
        const scrub = str.replace(regEx,'x'.repeat(q.length))
        return extract(scrub,q)
      }
      else {
        const regExTrimString = `[^|]*${q}[^|]*`
        const regExTrim = new RegExp(regExTrimString,"gi")
        const strTrim = str.match(regExTrim)[0].trim().replace(regEx,`<mark>${q}</mark>`)
        return strTrim
      }
    }

    return results.map(result => {

      const doc = searchIndex.docs[result.ref]

      const processResults = Object.keys(result.matchData.metadata).map(match => {
        const matchData = result.matchData.metadata[match]
        return matchData.body.position.map(matchPos => {
          const start = matchPos[0]-40
          const end = matchPos[0] + matchPos[1] + 40
          return extract(doc.body.slice(start,end),match)
        })
      })

      return {
        page: doc.pageTitle,
        route: doc.pageRoute,
        results: `…${processResults.join('… …')}…`
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const term = e.target.searchPageSearch.value
    setSearchTerm(term)

    trackEvent({
      prop11: "BioBank Global Search - Results New Search",
      eVar11: "BioBank Global Search - Results New Search",
      eVar13: "+1",
      prop14: term,
      eVar14: term,
      events: "event2"
    })
  }

  const handleChange = (e) => {
    const input = e.target.value
    if(input.length > 1) {
      setIsDisabled(false)
    } else (
      setIsDisabled(true)
    )
  }

  const trackClick = (e) => {
    trackEvent({
      prop50: e.target.textContent,
      prop13: e.target.dataset.rank
    })
  }

  return (
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">{t('search.title')}</Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={3}>
          <form className={classes.searchForm} onSubmit={handleSubmit}>
            <TextField
              id="searchPageSearch"
              className={classes.input}
              placeholder={t('search.input_placeholder')}
              inputProps={{ 'aria-label': 'search' }}
              variant="outlined"
              InputProps={ // props applied to the Input component
                { startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }
              }
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('buttons.search')}</Button>
          </form>
        </Box>
        <Box mt={3}>
          <Typography variant="h3" component="h3">{t('search.results_title')} {searchTerm}</Typography>
        </Box>
        <Box mt={3}>
          {searchResults && searchResults.map((result,i) => {
            const {page,route,results} = result
            return (
              <Box key={i} mb={3}>
                <Typography component="div">
                  <Link to={route} className="bold" component={RouterLink} data-rank={i + 1} onClick={trackClick}>{page}</Link>
                </Typography>
                <Typography component="div">
                  <RenderContent source={results} />
                </Typography>
                <Typography className={classes.dim}>{window.location.origin + route}</Typography>
              </Box>
            )
          })}
          {searchResults && !searchResults.length && <Typography variant="body2">{t('search.results_none')}</Typography>}
        </Box>
      </Container>
    </Box>
  )
}

export default SearchResults