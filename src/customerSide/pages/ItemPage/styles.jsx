import styled from 'styled-components';
import { Button, Divider, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';

const AddButton = styled(Button)`
    padding: 10px !important;
    background-color: black !important;
    border-radius: 10px !important;
`
const AddButtonContainerStyled = styled(Grid)`
position: fixed;
    bottom: 0;
    width: 100%;
    padding: 15px;
    background-color: white !important;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
                rgba(0, 0, 0, 0.12) 0px -12px 30px, 
                rgba(0, 0, 0, 0.12) 0px 4px 6px, 
                rgba(0, 0, 0, 0.17) 0px 12px 13px, 
                rgba(0, 0, 0, 0.09) 0px -3px 5px;
    @media only screen and (min-width: 600px) {
        display: none;
    }
`
const CancelButtonContainerStyled = styled(Grid)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 15px;
`
const DividerStyled = styled(Divider)`
    border: 3px solid ${grey[200]} !important;
`
const ImageStyled = styled.img`
    width: 100%;
    height: ${(props) => props.$isSmallScreen ? '250px' : '70vh'}
`
const LargeScreenAddButtonContainerStyled = styled(Grid)`
    @media only screen and (max-width: 600px) {
        display: none;
    }
`

export { AddButton, AddButtonContainerStyled, CancelButtonContainerStyled, DividerStyled, ImageStyled, LargeScreenAddButtonContainerStyled }