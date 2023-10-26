import styled from 'styled-components';
import { Box, Fab, Grid } from '@mui/material';

const ButtonContainer = styled(Box)`
    position: absolute !important;
    left: ${(props) => props.$isSmallScreen ? '70%' : '80%'}
`
const CoverImage = styled.img`
    border-radius: ${(props) => props.$isSmallScreen ? '0px' : '20px'};
    width: 100%;
    height: 100%;
` 
const CoverImageGrid = styled(Grid)`
    height: 20vh;
    @media only screen and (min-width: 600px) {
        height: 40vh;
    }
    @media only screen and (min-width: 1000px) {
        padding: 0px 8vw;
    }
    @media only screen and (min-width: 1300px) {
        height: 50vh;
        padding: 0px 15vw;
    }
`
const FavoriteFab = styled(Fab)`
    background: white !important;    
`
const GridContainer = styled(Grid)`
    padding-left: 10px;
    @media only screen and (min-width: 1000px) {
        padding: 0px 8vw;
    }
    @media only screen and (min-width: 1300px) {
        padding: 0px 15vw;
    }
`
const SearchFab = styled(Fab)`
    background: white !important;    
`

export { ButtonContainer, CoverImage, CoverImageGrid, FavoriteFab, GridContainer, SearchFab }
