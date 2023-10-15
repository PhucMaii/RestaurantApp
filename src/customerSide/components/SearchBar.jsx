import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

export default function SearchBar() {
  return (
    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Fast food, Chinese Food, etc"
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
  </Paper>
  )
}
