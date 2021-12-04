import React from 'react'

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: '2px',
      marginLeft: '1.5%',
      marginRight: '1.5%',
      marginTop: '25px'
    }}
  />
)

export default ColoredLine
