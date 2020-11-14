import React from 'react';

const ArticleImage = (props) => <img 
  src={process.env.PUBLIC_URL + '/assets/images/article/desktop/' + props.src} 
  alt={props.alt}
  srcSet={`
  /${process.env.PUBLIC_URL}assets/images/article/desktop/${props.src} 380w,
    /${process.env.PUBLIC_URL}assets/images/article/tablet/${props.src} 600w,
    /${process.env.PUBLIC_URL}assets/images/article/tabletHD/${props.src} 1200w,
    /${process.env.PUBLIC_URL}assets/images/article/desktopHD/${props.src} 760w,
  `}
  sizes={`
    (max-width: 599px) 87.63vw,
    (max-width: 959px) 600px,
    380px
  `}
/>

export default ArticleImage