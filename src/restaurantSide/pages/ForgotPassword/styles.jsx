import { Grid } from '@mui/material';
import styled from 'styled-components';

const GridContainerStyled = styled(Grid)`
  padding: 10% 20%;
  @meida only screen and (max-width: 600px) {
    padding: 30%;
  }
`;

export { GridContainerStyled };
