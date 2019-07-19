import React, {useState, useEffect} from 'react'
import Loadable from 'react-loadable'

import CodeExample from 'wix-storybook-utils/CodeExample'

import styles from './styles.scss'


const Example = ({path, align = 'center'}) => {
  const [componentRaw, setComponentRaw] = useState('')


  useEffect(() => {
    const LoadComponentRaw = import('!!raw-loader!../' + path)
    LoadComponentRaw.then((data) => {
      setComponentRaw(data.default)
    })
  })
  
  const LoadComponent = Loadable({
    loader: () => import('../' + path),
    loading: () => <div>Loading...</div>
  })

  return (

    <div className={`${styles.codeExample} ${styles['codeExample--' + align]}`}>
      <CodeExample code={componentRaw}>
        <LoadComponent />
      </CodeExample>
    </div>
  )
}

export default Example