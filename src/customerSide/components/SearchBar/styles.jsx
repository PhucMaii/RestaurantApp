import { Paper, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const SearchBarContainer = styled(Paper)`
    p: "2px 4px"; 
    display: "flex"; 
    alignItems: "center";
    width: "100%"
`
const SearchTextField = styled(TextField)`
    border-radius: 20px; 
    background-color: ${grey[300]};
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: none !important;
    padding: 15px !important;
`

export { SearchBarContainer, SearchTextField }