import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const SectionStyled = styled(Typography)`
  background-color: ${props => props.$currsection ? grey[300] : ""};
  color: ${props => props.$currsection && props.$isDarkTheme ? grey[900] : ""};
  border-radius: 10px;
  cursor: pointer;
`;
const SectionContainer = styled(Grid)`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 1px solid ${props => props.$isDarkTheme ? grey[300] : grey[500]}
`

export { SectionStyled, SectionContainer };
