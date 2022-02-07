import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const root = props => {
  console.log(props)
  if(props?.children[0] && props.children[0].props?.children) {
    return props.children[0].props?.children
  }
  if(props?.children[0] && props.children[0].props?.element) {
    return props.children[0].props?.element
  }
  if(props.children) {
    return props.children
  }
}

const RenderContent =  (props) => <ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} components={{
  p: ({node, ...props}) => props.children
}} />

export default RenderContent