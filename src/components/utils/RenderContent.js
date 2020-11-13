import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown/with-html'

const root = props => {
  // console.log(props)
  if(props.children[0] && props.children[0].props.children) {
    return <Fragment>{props.children[0].props.children}</Fragment>
  }
  if(props.children[0] && props.children[0].props.element) {
    return <Fragment>{props.children[0].props.element}</Fragment>
  }
  if(props.children) {
    return <Fragment>{props.children}</Fragment>
  }
}

const RenderContent =  (props) => <ReactMarkdown {...props} escapeHtml={false} renderers={{ root }} />

export default RenderContent