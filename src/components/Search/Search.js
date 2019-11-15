import React, { useEffect } from 'react'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Search as SearchIcon } from '@material-ui/icons'
// import elasticlunr from 'elasticlunr'
import lunr from 'lunr'
import { useTranslation } from 'react-i18next'
import { flattenObject } from '../../utils/utils'

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
}));

const Search = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('homePage')
  let searchIndex

  useEffect(() => {
    const data = i18n.getDataByLanguage('en')

    // const textData = Object.keys(data).map(resource => {
    //   if(resource !== 'common'){
    //     const flatData = flattenObject(data[resource])

    //     const text =  Object.keys(flatData).map(key=>{
    //       const cleanUpText = flatData[key].replace(/<[\/]*?([a-z]+) *[\/]*?>/g,'')
    //       return cleanUpText
    //     }).join(" ")

    //     console.log('searchIndex',searchIndex)

    //     searchIndex.addDoc({
    //       id: resource,
    //       body: text
    //     })

    //   }
    // })
    let textData = []
    Object.keys(data).map(resource => {
      if(resource !== 'common'){
        const flatData = flattenObject(data[resource],resource)

        Object.keys(flatData).map(key=>{
          const cleanUpText = flatData[key].replace(/<[\/]*?([a-z]+) *[\/]*?>/g,' ')
          textData.push({
            id: key,
            body: cleanUpText
          })
        })
      }
    })

      searchIndex = lunr(function(){
        this.ref('id')
        this.field('body')

        textData.map(doc => {
          this.add(doc)
        })
      })

  }, [searchIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    const rawSearch = e.target.siteSearch.value
    // split the raw search and wildcard the search terms for 'contains' search
    const searchTerms = rawSearch.split(" ").map(term => {
      return `*${term}*`
    }).join(" ")

    const result = searchIndex.search(searchTerms)
    console.log("Search Results:", result)
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
      <InputBase
        id="siteSearch"
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Search