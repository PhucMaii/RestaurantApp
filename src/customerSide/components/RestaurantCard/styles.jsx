import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const MainContainer = styled(Grid)`
    border-radius: 20px;
    padding: 10px;
`
const RatingContainer = styled(Grid)`
    background-color: ${grey[200]};
    border-radius: 20px; 
    display: flex;
    justify-content: center;
    align-items: center
`
const RestaurantImage = styled.img`
    border-radius: 20px;
    width: 100%;
    @media only screen and (max-width: 1500px) {
        height: 250px;
    }
    @media only screen and (min-width: 1500px) {
        height: 170px;
    }
`
    
export { MainContainer, RatingContainer, RestaurantImage }