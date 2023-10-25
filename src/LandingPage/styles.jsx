import styled from "styled-components";
import { Button, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

const GridContainer = styled(Grid)`
background-color: ${grey[500]};
`
const LeftGridContainer = styled(Grid)`
display: flex;
flex-direction: column !important;
justify-content: center;
align-items: center;
gap: 10vh;
padding: 50px;
`
const NavigateButton = styled(Button)`
  height: 50px;
  @media only screen and (max-width: 600px) {
    height: 80px;
  }
`
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

export { GridContainer, LeftGridContainer, NavigateButton, TopicImageStyled, TopicImageGrid }
