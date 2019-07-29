import React, {useState, useEffect} from 'react'
import Loadable from '@loadable/component'

import CodeExample from 'wix-storybook-utils/CodeExample'

import styles from './styles.scss'

const isRequired = () => { throw new Error('param is required'); };

const Example = ({path = isRequired(), align = 'center',...rest}) => {
  const [componentRaw, setComponentRaw] = useState('')

  // in order to use dynamic imports, a base path must be established before the variable. Using the '../../' sets the base path to the project root
  useEffect(() => {
    Loadable(() => import(/* webpackMode: "eager" */`!!raw-loader!../../${path}`)).then((data) => {
      setComponentRaw(data.default)
    })
  })
  
  const LoadComponent = Loadable(path => import(/* webpackMode: "eager" */`../../${path}`), {
    fallback: <div>Loading...</div>
  })

  return (

    <div className={`${styles.codeExample} ${styles['codeExample--' + align]}`}>
      <CodeExample code={componentRaw}>
        <LoadComponent path={path} {...rest} />
      </CodeExample>
    </div>
  )
}

export default Example