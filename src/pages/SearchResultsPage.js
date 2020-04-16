import React, { useEffect, useState } from 'react'
import { Link as RouterLink, navigate } from '@reach/router'
import { Box, Button, Container, InputAdornment, Link, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import { 
  Search as SearchIcon
} from '@material-ui/icons'
// import { searchIndex } from '../i18n'
import { useTranslation } from 'react-i18next'
import { useTracking } from 'react-tracking'
import lunr from 'lunr'
import { objectValuesToString } from '../utils/utils'
import RenderContent from '../components/utils/RenderContent'

const useStyles = makeStyles( theme => ({
  wrapper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '74%'
    },
    [theme.breakpoints.up('md')]: {
      width: '64%'
    }
  },
  searchForm: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    padding: theme.spacing(2,3,2,0),
    '& > *': {
      margin: theme.spacing(0,1)
    }
  },
  input: {
    flexGrow: 1
  },
  dim: {
    color: theme.palette.grey.medium,
    wordBreak: 'break-all'
  }
}))

const SearchResults = (props) => {
  // const {location} = props
  const classes = useStyles()
  const { t, i18n } = useTranslation(['common','homePage','about','eligibility','research','consent','donate','testing','activate','privacy','hospitalList','searchResults'])
  const { trackEvent } = useTracking()
  // const term = location ? location.state ? location.state.term : '' : ''
  const term = window.history.state ? window.history.state.term : ""
  const [searchTerm, setSearchTerm] = useState(term)
  const [searchTermInput, setSearchTermInput] = useState(term)
  const [searchResults, setSearchResults] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [searchIndex, setSearchIndex] = useState()
  const [docData, setDocData] = useState({})

  useEffect(() => {
    // create search index
    const data = i18n.getDataByLanguage(i18n.languages[0])
    let textData = [] // lunr needs an array of docs
    let tempData = {} // search results need an object keyed to the resource's name space
  
    Object.keys(data).forEach(resource => {
      if(resource !== 'common' && resource !== 'searchResults'){
        const ignoreKeys = ['pageTitle', 'pageRoute', 'alt_text', 'metaData']
        const value = objectValuesToString(data[resource], ignoreKeys)
        const entry = {
          id: resource,
          pageTitle: data[resource].pageTitle,
          pageRoute: data[resource].pageRoute,
          body: value
        }
  
        textData.push(entry)
        tempData[resource] = entry
      }
    })
  
    const index = lunr(function(){
      this.ref('id')
      this.field('body')
      this.metadataWhitelist = ['position']
      this.pipeline.remove(lunr.stemmer)
      // this.pipeline.remove(lunr.stopWordFilter)
  
      textData.forEach(doc => {
        this.add(doc)
      })
    })

    // set the index
    setSearchIndex(index)
    
    // save the docs for later reference in search results
    setDocData(tempData)

  }, [i18n,i18n.language])
  
  useEffect(() => {
    if(term === "" || searchTerm !== term) {
      setSearchTermInput(term)
      setSearchTerm(term)
      return
    }
    const extract = (str,q) => {
      const regEx = new RegExp(q,"i")
      const match = str.search(regEx,"gi")
      if(match < 0){
        return null
      }
      // if string has two matches, then discard one
      if (match > 0 && match < 40) {
        return null
        // const scrub = str.replace(regEx,'x'.repeat(q.length))
        // return extract(scrub,q)
      }
      else {
        const regExTrimString = `[^|]*${q}[^|]*`
        const regExTrim = new RegExp(regExTrimString,"gi")
        const regExG = new RegExp(q,"gi")
        const strTrim = str.match(regExTrim)[0].trim().replace(regExG,`<mark>${q}</mark>`)
        return strTrim
      }
    }

    const processSearch = (results = []) => {

      return results.map(result => {
  
        const doc = docData[result.ref]
        const processResults = Object.keys(result.matchData.metadata).map(match => {
          const matchData = result.matchData.metadata[match]
          return matchData.body.position.map((matchPos,i) => {
            if(i > 5) return null // limit results to 5 example snippits per match set
            const start = matchPos[0]-40
            const end = matchPos[0] + matchPos[1] + 40
            return extract(doc.body.slice(start,end),match)
          }).filter(Boolean).join('… …') // remove empty entries and join the remainder together
        })
  
        return {
          page: doc.pageTitle,
          route: doc.pageRoute,
          results: `…${processResults.join('… …')}…`
        }
      })
    }

    // perform search
    if(searchIndex){
      const results = processSearch(searchIndex.search(`*${searchTerm}*~1 ${searchTerm}* *${searchTerm}`))
      setSearchResults(results)

      trackEvent({
        event:'pageview',
        prop6: "Search results",
        eVar10: results.length.toString(),
        prop14: searchTerm,
        eVar14: searchTerm,
        prop10: t("searchResults:metaData.title")
      })
    }

  }, [searchTerm, searchIndex, docData])

  const handleSubmit = (e) => {
    e.preventDefault()
    const term = e.target.searchPageSearch.value
    setSearchTerm(term)
    // update the history to store the search term
    window.history.pushState({term}, "", "/search")

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
    setSearchTermInput(input)
  }

  const trackClick = (e) => {
    trackEvent({
      prop50: e.target.textContent,
      prop13: e.target.dataset.rank
    })
  }

  return (
    <Box>
      <Helmet>
      <title>{t("searchResults:metaData.title")} | NCI</title>
        <meta name="title" content={t("searchResults:metaData.title")} />
        <meta property="og:title" content={t("searchResults:metaData.OG_title")} />
        <meta name="description" content={t("searchResults:metaData.description")} />
        <meta property="og:description" content={t("searchResults:metaData.OG_description")} />
        <link rel="canonical"      href={`${process.env.REACT_APP_PUBLIC_URL}/search`} />
        <meta property="og:url" content={`${process.env.REACT_APP_PUBLIC_URL}/search`} />
      </Helmet>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">{t('searchResults:title')}</Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box className={classes.wrapper}>
          <Box my={3} component="section">
            <form className={classes.searchForm} onSubmit={handleSubmit}>
              <TextField
                id="searchPageSearch"
                className={classes.input}
                placeholder={t('searchResults:input_placeholder')}
                inputProps={{ 'aria-label': 'search' }}
                variant="outlined"
                value={searchTermInput}
                InputProps={ // props applied to the Input component
                  { startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }
                }
                onChange={handleChange}
              />
              <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>{t('buttons.search')}</Button>
            </form>
          </Box>
          <Box mt={3} component="section">
            {searchTerm && <Typography variant="h3" component="h3">{searchResults.length} {t('searchResults:results_title')} {searchTerm}</Typography>}
            {searchTerm && <Box mt={3}>
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
              {searchResults && !searchResults.length && <Typography variant="body2">{t('searchResults:results_none')}</Typography>}
            </Box>
            }
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default SearchResults