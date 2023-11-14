import React from 'react';
import PropTypes from 'prop-types';
import { Grid, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchTextField } from './styles';

export default function SearchBar({ handleSubmitSearchBar, placeholder, searchKeywords, setSearchKeywords }) {
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
          placeholder={placeholder}
          variant="standard"
          value={searchKeywords}
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
          onKeyDown={handleSubmitSearchBar}
        />
  </Grid>
  )
}

SearchBar.propTypes = {
  handleSubmitSearchBar:PropTypes.func,
  placeholder: PropTypes.string,
  searchKeywords: PropTypes.string.isRequired, 
  setSearchKeywords: PropTypes.func.isRequired,
}