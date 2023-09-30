import styled from "styled-components";
import { ButtonGroup, Grid, List } from "@mui/material";

const ButtonGroupModal = styled(ButtonGroup)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${(props) => props.maxWidth};
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const GridModal = styled(Grid)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${(props) => props.maxWidth};
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const ListModal = styled(List)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${(props) => props.maxWidth};
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export { ButtonGroupModal, GridModal, ListModal };
