import styled from 'styled-components';
import { ListItem } from '@mui/material';


const TabStyled = styled(ListItem)`
    margin-top: 15px;
    background-color: ${props => props.isSelected ? 'white' : 'inherit'};
    border: ${props => props.isSelected ? '2px solid black' : 'none'}
`

export { TabStyled };