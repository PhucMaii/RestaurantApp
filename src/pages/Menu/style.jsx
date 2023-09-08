import { Typography } from '@mui/material'
import styled from 'styled-components'

const SectionStyled = styled(Typography)`
  background-color: ${props => props.currentSection ? "#f3b821" : "white"};
  border-radius: 10px;
  cursor: pointer;
`;

export { SectionStyled };