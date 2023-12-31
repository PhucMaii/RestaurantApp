import styled from 'styled-components';
import {
  Typography,
  Accordion,
  Box,
  AccordionDetails,
  Button,
  Grid,
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';


const GreenText = styled(Typography)`
  color: ${green[700]};
`;
const RedText = styled(Typography)`
  color: ${red[700]};
`;
const AccordionStyled = styled(Accordion)`
  width: 1100px;
  border: 1px solid ${(props) => props.$isDarkTheme ? grey[800] : grey[300]};
  border-radius: 15px !important;
  box-shadow: rgba(${props => props.$isDarkTheme ? '0 0 0 / 20%' : '100, 100, 111, 0.2'}) 0px 7px 29px 0px !important;
  @media only screen and (max-width: 800px) {
    width: 100%;
  }
`;
const TypographyStyled = styled(Typography)`
  @media only screen and (max-width: 800px) {
    width: 100%;
    text-align: center;
  }
`;
const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 800px) {
    width: 90%;
    text-align: center;
  }
`;
const AccordionSummaryFlexBox = styled(Box)`
  display: flex;
  gap: 40px;
  align-items: center;
  @media only screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100vw, 1fr));
    gap: 1rem;
    place-items: center;
  }
`;
const AccordionDetailsStyled = styled(AccordionDetails)`
  background-color: ${(props) => props.$isDarkTheme ? grey[800] : grey[300]};
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;
const TimerFlexBox = styled(Box)`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const DividerContainerStyled = styled(Grid)`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
export {
  GreenText,
  RedText,
  AccordionStyled,
  AccordionSummaryFlexBox,
  AccordionDetailsStyled,
  TimerFlexBox,
  TypographyStyled,
  ButtonStyled,
  DividerContainerStyled,
};
