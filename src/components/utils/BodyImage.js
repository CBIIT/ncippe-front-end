import React from 'react'

const BodyImage = (props) => <img 
  src={process.env.PUBLIC_URL + '/assets/images/body/desktop/' + props.src} 
  alt={props.alt}
  // tablet breakpoints use the same sizes as desktop
  srcSet={`
    ${process.env.PUBLIC_URL}/assets/images/body/desktop/${props.src} 600w,
    ${process.env.PUBLIC_URL}/assets/images/body/desktopHD/${props.src} 1200w,
  `}
  sizes={`
    (max-width: 599px) 87.63vw,
    (max-width: 959px) 600px,
    600px
  `}
/>

export default BodyImage