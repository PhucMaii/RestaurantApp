import { Typography } from '@mui/material'
import React from 'react'

export default function Divider(props) {
    const lineStyle = {
        width: '40%',
        height: '1px',
        backgroundColor: '#854D27'
    }

    const flex = {
        display: 'flex'
    }

    const typographyStyled = {
        marginBottom: "20px"
    }
  return (
    <span style={flex}>
        <div style={lineStyle}></div>
        <Typography style={typographyStyled}>{props.value}</Typography>
        <div style={lineStyle}></div>
    </span>
  )
}
