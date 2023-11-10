import styled from 'styled-components';
import { Box, Grid } from '@mui/material';

const BoxModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight ? props.maxHeight : 'auto'}
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
  max-height: ${(props) => props.maxHeight ? props.maxHeight : 'auto'}
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export { BoxModal, GridModal }