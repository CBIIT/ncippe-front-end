import React from 'react'

export default (props) => (
  <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
    <img srcset={`/assets/images/spinner-dna.svg`} src={`/assets/images/spinner-dna.gif`} alt="loading indicator" width="250px" style={{width:250,height:250,margin:'auto 0'}} />
    { props.message && <span>{props.message}</span>}
  </div>
)