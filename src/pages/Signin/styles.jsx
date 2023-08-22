import { FormControl, Grid, Typography } from "@mui/material";
import styled from "styled-components";

const GridStyled = styled(Grid)`
  width: 100%;
  height: 100%;

  @media only screen and (min-width: 701px) {
    padding: 10%;
    align-items: center;
    justify-content: center
  }
`;
const TitleStyled = styled(Typography)`
  font-weight: bold;
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
  width: 100%;

`;
const TopicImageGrid = styled(Grid)`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
const InputGrid = styled(Grid)`
  @media only screen and (max-width: 700px) {
    margin-top: 25%;
  }
`;

export {
  GridStyled,
  TitleStyled,
  OutlinedInputStyled,
  LogoStyled,
  TopicImageStyled,
  TopicImageGrid,
  InputGrid,
};
