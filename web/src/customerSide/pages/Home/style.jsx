import { Button, Divider } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const CartButton = styled(Button)`
    border-radius: 10px !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px !important; 
    color: white !important;
    background-color: black !important;
`
const ThickDivider = styled(Divider)`
   border: 5px solid ${grey[200]};
`
export { CartButton, ThickDivider }