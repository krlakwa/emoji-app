import * as React from 'react'

import './Input.css'

const Input = (props) => {
  return (
    <div className="input">
      <input
        className="input__field"
        onChange={props.onChange}
        placeholder="Search..."
      />
    </div>
  )
}

export default Input
