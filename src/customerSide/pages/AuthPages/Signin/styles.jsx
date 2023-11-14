import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const ContainerGridStyled = styled(Grid)`
    background-color: ${grey[50]};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    @media only screen and (max-width: 600px) {
        background-color: white;
        box-shadow: none;
    }
`
const LogoStyled = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 20px;
`;

export { ContainerGridStyled, LogoStyled }