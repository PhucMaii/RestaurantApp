import React from 'react';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchBarContainer } from './styles';

export default function SearchBar() {
  return (
    <SearchBarContainer
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
  </SearchBarContainer>
  )
}
