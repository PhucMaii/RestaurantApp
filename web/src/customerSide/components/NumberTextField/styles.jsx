import { Fab, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const ContainerStyled = styled(Grid)`
    background-color: ${grey[300]};
    border-radius: 20px;
`
const FabStyled = styled(Fab)`
    z-index: 0 !important;
    box-shadow: none !important;
`

export { ContainerStyled, FabStyled }