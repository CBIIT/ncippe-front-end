import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const RenderContent =  (props) => <ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} />

export default RenderContent