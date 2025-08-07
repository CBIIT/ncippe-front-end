import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { useNavigate } from 'react-router-dom'

// strip all <p> tags
// const RenderContent =  (props) => <ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} components={{
//   p: ({node, ...props}) => props.children
// }} />

// const RenderContent =  (props) => <ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} components={{
//   p: React.Fragment,
// }} />

const RenderContent =  (props) => {
  const navigate = useNavigate();

  // remove wrapping paragraphs made by markdown, but keep paragraphs that we have in our authored content
  const removeRootParagraph = ({node,...props}) => {
    const {children} = props

   // Ensure node and children exist before accessing properties
   if (!node || !node.children || node.children.length === 0 || !node.position || !node.children[0].position) {
    return <p>{children}</p>; // Fallback to preserving paragraph if data is incomplete
  }
  
    if (node.position?.start?.offset === node.children[0].position?.start?.offset) {
      return children;
    }
    // if start.offsets do not match, then this node was processed by rehypeRaw and the HTML tags at the start of the text node account for different start positions
    return <p>{children}</p>
  }

  // Intercept anchor elements
  const customLink = ({ href, children, ...rest }) => {
    const isInternal = href?.startsWith('/');

    if (isInternal) {
      return (
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            navigate(href);
          }}
          {...rest}
        >
          {children}
        </a>
      );
    }
     // external links - open in new tab safely
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  };

  return (<ReactMarkdown {...props} rehypePlugins={[rehypeRaw]} components={{
      p: removeRootParagraph,
      a: customLink,
  }} /> );
}

export default RenderContent