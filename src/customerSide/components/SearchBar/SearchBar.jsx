import React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchTextField } from './styles';

export default function SearchBar({ setSearchKeywords}) {
  const handleChangeKeywords = (e) => {
    setSearchKeywords(e.target.value);
  }
 
  return (
    <Grid
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
        <SearchTextField
          fullWidth
          placeholder="Fast food, Chinese Food, etc"
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{borderRadius: '20px !important', backgroundColor: ''}}
          onChange={handleChangeKeywords}
        />
  </Grid>
  )
}

SearchBar.propTypes = {
  setSearchKeywords: PropTypes.func.isRequired
}