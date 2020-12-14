import React from 'react'
import PropTypes from 'prop-types'

/**
 * A stylish animated loading indicator
 */
const Loader = (props) => (
  <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    <img srcSet={`/assets/images/spinner-dna.svg`} src={`/assets/images/spinner-dna.gif`} alt="loading indicator" width="250px" style={{width:250,height:250,margin:'auto 0'}} />
    { props.message && <span>{props.message}</span>}
  </div>
)
Loader.displayName = 'Loading'
Loader.propTypes = {
  /**
   * An optional message to display below the animated loading indicator
   */
  message: PropTypes.string
}
export default Loader