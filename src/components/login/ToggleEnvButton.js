import React, { useContext } from 'react'
import { Button } from '@material-ui/core'

import { LoginContext } from './Login.context'

export default () => {
  const [loginContext, dispatch] = useContext(LoginContext)

  const toggleProd = () => {
    dispatch({
      type: 'update',
      userData: {
        ...loginContext,
        env: loginContext.env === 'local' ? 'prod' : 'local'
      }
    })
  }

  return (
    <div style={{marginTop:'100px'}}>
      <Button variant="contained" onClick={toggleProd}>Target {loginContext.env === 'local' ? 'prod' : 'local'} environment</Button>
    </div>
  )
}
