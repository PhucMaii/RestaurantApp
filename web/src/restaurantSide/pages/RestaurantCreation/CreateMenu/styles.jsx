import { Stack, TextField, Typography, Chip, Grid } from '@mui/material';
import styled from 'styled-components';

const MenuImage = styled.img`
  width: 50%;
`;
const HelperTextStyled = styled(Typography)`
  width: 50%;
`;
const StackStyled = styled(Stack)`
  width: 100%;
`;
const HalfInputStyled = styled(TextField)`
  width: 50%;
`;
const ChipStyled = styled(Chip)`
  margin-bottom: 10px;
  margin-right: 10px;
`;
const ButtonContainerGrid = styled(Grid)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
`;
export {
  MenuImage,
  HelperTextStyled,
  StackStyled,
  HalfInputStyled,
  ChipStyled,
  ButtonContainerGrid,
};
