import { FormControl, Grid, Typography } from "@mui/material";
import styled from "styled-components";

const GridStyled = styled(Grid)`
  width: 100%;
  height: 100%;
`;
const TitleStyled = styled(Typography)`
  color: #854d27;
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
  width: "100%";
`;

export {
  GridStyled,
  TitleStyled,
  OutlinedInputStyled,
  LogoStyled,
  TopicImageStyled,
};
