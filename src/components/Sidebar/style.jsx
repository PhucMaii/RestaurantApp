import styled from 'styled-components';
import { ListItem } from '@mui/material';
import { grey } from '@mui/material/colors';

const TabStyled = styled(ListItem)`
  margin-top: 15px;
  background-color: ${(props) => (props.$ischoose ? grey[300] : 'inherit')};
  border: ${(props) => (props.$ischoose ? '2px solid black' : 'none')};
  border-radius: 10px;
`;

export { TabStyled };
