import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown/with-html'

const root = props => {
  if(props.children[0].props.children) {
    return <Fragment>{props.children[0].props.children}</Fragment>
  }
  if(props.children[0].props.element) {
    return <Fragment>{props.children[0].props.element.props.children}</Fragment>
  }
  if(props.children) {
    return <Fragment>{props.children}</Fragment>
  }
}

export default props => <ReactMarkdown {...props} escapeHtml={false} renderers={{ root }} />
