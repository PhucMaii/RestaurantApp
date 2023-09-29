import { Typography } from '@mui/material';
import styled from 'styled-components';

const SectionStyled = styled(Typography)`
  background-color: ${props => props.$currsection ? "#f3b821" : ""};
  color: ${props => props.$isDarkTheme && !props.$currsection ? "white" : ""};
  border-radius: 10px;
  cursor: pointer;
`;

export { SectionStyled };