import { Grid } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const BoxShadowBackground = styled(Grid)`
    background-color: ${(props) => props.$isLargeScreen && grey[100]};
    border-radius: ${(props) => props.$isLargeScreen && '20px'};
    height: ${(props) => props.$cardHeight ? props.$cardHeight : 'auto'}
`

export { BoxShadowBackground }