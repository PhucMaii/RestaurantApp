import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal, Typography } from '@mui/material';
import { GridModal } from '../styles';
import SearchBar from '../../SearchBar/SearchBar';
import SectionDisplay from './SectionDisplay';
import { grey } from '@mui/material/colors';

export default function SearchItemsModal({ 
  filteredList, 
  handleSearch, 
  onClose, 
  open, 
  searchKeywords, 
  setSearchKeywords 
}) {
  return (
    <Modal open={open} onClose={onClose}>
        <GridModal style={{backgroundColor: 'white'}} container maxWidth="500px" maxHeight="500px">
          <Grid item xs={12}>
            <SearchBar 
              handleSubmitSearchBar={handleSearch} 
              placeholder="Search items" 
              searchKeywords={searchKeywords}
              setSearchKeywords={setSearchKeywords}
            />
          </Grid>
          <Grid container justifyContent="center">
            {
              filteredList.length > 0 ? filteredList.map((section) => {
                return section.items && section.items.length > 0 && <SectionDisplay key={section.name} section={section} />
              }) : <Typography mt={2} textAlign="center" color={grey[500]} variant="h6">Item couldn&apos;t found</Typography>
            }
          </Grid>
        </GridModal>
    </Modal>
  )
}

SearchItemsModal.propTypes = {
  filteredList: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  searchKeywords: PropTypes.string.isRequired,
  setSearchKeywords: PropTypes.func.isRequired
}