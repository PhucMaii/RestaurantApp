import { Grid } from '@mui/material';
import styled from 'styled-components';

const GridStyled = styled(Grid)`
  width: 100%;
  height: 100%;

  @media only screen and (min-width: 701px) {
    padding: 10%;
  }
  @media only screen and (min-width: 901px) {
    padding: 5%;
    justify-content: center;
    align-items: center;
  }
`;
const TopicImageStyled = styled.img`
  width: 100%;
`;
const TopicImageGrid = styled(Grid)`
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
const GridContainerStyled = styled(Grid)`
  margin-top: 30px;
`;
export {
  GridStyled,
  TopicImageStyled,
  TopicImageGrid,
  GridContainerStyled,
};
