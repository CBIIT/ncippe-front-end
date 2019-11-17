import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Box, Button, Container, Link, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import i18n, { searchIndex } from '../i18n'
import ReactMarkdown from 'react-markdown'

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
  const term = location ? location.state ? location.state.term : '' : ''
  const [searchTerm, setSearchTerm] = useState(term)
  const [searchResults, setSearchResults] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    // console.log("running search effect")
    // console.log('i18n',i18n)
    // console.log('i18n.getDataByLanguage("en")',i18n.getDataByLanguage('en'))
    // console.log('searchIndex',searchIndex)
    // split the raw search and wildcard the search terms for 'contains' search
    if(searchTerm.length > 0){
      const searchTerms = searchTerm.split(" ").map(term => {
        return `*${term}*`
      }).join(" ")

      if(searchIndex){
        const result = searchIndex.search(searchTerms)
        // console.log("Search Results:", result)
        setSearchResults(result)

      }
    }
  }, [searchTerm, searchIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.searchPageSearch.value)
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
    <Box>
      <Container className="pageHeader--gradient">
        <Typography variant="h2" component="h1">Search results</Typography>
      </Container>
      <Container className="mainContainer mainContainer--public">
        <Box mt={3}>
          <form className={classes.searchForm} onSubmit={handleSubmit}>
            <TextField
              id="searchPageSearch"
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              variant="outlined"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>Search</Button>
          </form>
        </Box>
        <Box mt={3}>
          <Typography variant="h3" component="h3"># Results for: {searchTerm}</Typography>
        </Box>
        <Box mt={3}>
          {searchResults.map((result,i) => {
            const ns = result.ref.match(/(^\w*)\./)[1]
            const key = result.ref.match(/\.(.*)/)[1]
            const lang = i18n.language.match(/(.*)-/)[1]
            const content = i18n.getResource(lang, ns, key)
            const route = i18n.getResource(lang, ns, 'pageRoute')

            // highlight search terms
            const regEx = new RegExp(`(${searchTerm})`,"gi")
            // strip out html
            // TODO: strip out markdown or process markdown then strip out html, processed markdown may result in nodes instead of string
            let cleanContent = content.replace(/<[\/]*?([a-z]+) *[\/]*?>/g,' ')
            
            if(cleanContent.length > 160) {

              const start = cleanContent.indexOf(searchTerm) - 80 < 0 ? 0 : cleanContent.indexOf(searchTerm) - 80
              const preEllipse = start > 0 ? '&hellip;' : ''
              const trimmedString = cleanContent.substr(start, 160)
              const postEllipse = trimmedString.length === 160 ? '&hellip;' : ''

              cleanContent = preEllipse + trimmedString + postEllipse
            }
            const highlightContent = cleanContent.replace(regEx,`<mark>$1</mark>`)

            //TODO: trim highlight content to max length of 160 characters
            // Issues: 
            //    1. trimming can cut through middle of html tags
            //    2. must sanatize markdown and html content
            //    3. multiple results in a large block could be hidden by a trimmed summary, but the ranking is still good
            //        - google seperates results with ... in 80 character strings

            return (
              <Box key={i} mb={3}>
                <Typography component="div"><Link to={route} className="bold" component={RouterLink}><ReactMarkdown source={i18n.getResource(lang, ns, 'pageTitle')} escapeHtml={false} /></Link></Typography>
                <Typography component="div"><ReactMarkdown source={highlightContent} escapeHtml={false} /></Typography>
                <Typography className={classes.dim}>{window.location.origin + route}</Typography>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}

export default SearchResults