import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

// strip all <p> tags
// const RenderContent =  (props) => <ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} components={{
//   p: ({node, ...props}) => props.children
// }} />

// const RenderContent =  (props) => <ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} components={{
//   p: React.Fragment,
// }} />

const RenderContent =  (props) => {

  // remove wrapping paragraphs made by markdown, but keep paragraphs that we have in our authored content
  const removeRootParagraph = ({node,...props}) => {
    const {children} = props

    if(node.position.start.offset === node.children[0].position.start.offset) {
      return children
    }
    // if start.offsets do not match, then this node was processed by rehypeRaw and the HTML tags at the start of the text node account for different start positions
    return <p>{children}</p>
  }

  return <ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} components={{
      p: removeRootParagraph,
  }} />
}


export default RenderContent