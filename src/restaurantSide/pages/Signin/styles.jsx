import { FormControl, Grid, Typography } from '@mui/material';
import styled from 'styled-components';

const GridStyled = styled(Grid)`
  width: 100vw;
`;
const TitleStyled = styled(Typography)`
  margin-bottom: 50px;
  text-align: center;
`;
const OutlinedInputStyled = styled(FormControl)`
  width: 100%;
`;
const LogoStyled = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;
const TopicImageStyled = styled.img`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100%;
  height: 100vh;
`;
const TopicImageGrid = styled(Grid)`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export {
  GridStyled,
  TitleStyled,
  OutlinedInputStyled,
  LogoStyled,
  TopicImageStyled,
  TopicImageGrid,
};
