import styled from 'styled-components';
import { ListItem } from '@mui/material';

const TabStyled = styled(ListItem)`
  margin-top: 15px;
  background-color: ${(props) => (props.$ischoose ? 'white' : 'inherit')};
  border: ${(props) => (props.$ischoose ? '2px solid black' : 'none')};
`;

export { TabStyled };
