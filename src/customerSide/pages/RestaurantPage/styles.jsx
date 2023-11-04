import styled from 'styled-components';
import { Box, Fab, Grid } from '@mui/material';

const ButtonContainer = styled(Box)`
    position: absolute !important;
    left: 70%;
`
const CoverImage = styled.img`
    width: 100%;
    height: 100%;
` 
const CoverImageGrid = styled(Grid)`
    height: 20vh;
`
const FavoriteFab = styled(Fab)`
    background: white !important;    
`
const SearchFab = styled(Fab)`
    background: white !important;    
`

export { ButtonContainer, CoverImage, CoverImageGrid, FavoriteFab, SearchFab }
