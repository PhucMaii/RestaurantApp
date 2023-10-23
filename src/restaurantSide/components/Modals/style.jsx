import styled from "styled-components";
import { ButtonGroup, Grid, List, Modal } from "@mui/material";
import { grey } from "@mui/material/colors";

const ButtonGroupModal = styled(ButtonGroup)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${(props) => props.maxWidth};
  background-color: ${props => props.$isDarkTheme ? grey[800] : "white"};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const GridModal = styled(Grid)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${(props) => props.maxWidth};
  background-color: ${props => props.$isDarkTheme ? grey[900] : "white"};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const ListModal = styled(List)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${(props) => props.maxWidth};
  background-color: ${props => props.$isDarkTheme ? grey[800] : "white"};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const ModalStyled = styled(Modal)`
  color: ${props => props.$isDarkTheme ? grey[200] : ""};
  overflow-y: auto;
`

export { ButtonGroupModal, GridModal, ListModal, ModalStyled };
