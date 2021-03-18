import React from 'react'
import PropTypes from 'prop-types'

import FileListItem from './FileListItem'
import NoItems from '../NoItems'

const FileList = (props) => {
  const { files, noItemsMsg, ...rest } = props

  return (
    files && files.length > 0 ? 
      files.map((file,i) => <FileListItem key={i} file={file} {...rest}/>)
      :
      <NoItems message={noItemsMsg} />
  )
}

FileList.displayName = 'FileList'
FileList.propTypes = {
  /**
   * An array of files as structured for the `FileListItem` component.
   */
  files: PropTypes.array,
  /**
   * A message to display (as text, html or markdown) when there are no files
   */
  noItemsMsg: PropTypes.string,
}

export default FileList