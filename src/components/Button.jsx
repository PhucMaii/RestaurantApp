import React from 'react'
import Button from '@mui/material/Button';

export default function CustomButton(props) {
  return (
    <Button 
        variant="text"
        onClick={props.handleClick}
        >{props.title}</Button>
  )
}
