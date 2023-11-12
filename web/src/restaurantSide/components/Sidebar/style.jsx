import styled from 'styled-components';
import { ListItem, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';

const FlagIconImg = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
`
const ListItemTextStyled = styled(ListItemText)`
    color: white;
`
const TabStyled = styled(ListItem)`
  margin-top: 15px;
  background-color: ${(props) => 
    props.$ischoose 
      ? props.$isDarkTheme
        ? grey[700]
        : grey[300] 
      : 'none'
      };
  box-shadow: ${(props) => (
    props.$ischoose 
      ? props.$isDarkTheme
        ? `rgba(0, 0, 0, 20%) 0px 8px 24px;` 
        : `rgba(149, 157, 165, 0.2) 0px 8px 24px`
      : 'none')};
  border: ${(props) =>
    props.$ischoose
      ? props.$isDarkTheme
        ? `1px solid ${grey[700]}`
        : `1px solid ${grey[400]}`
      : 'none'};
  
  border-radius: 10px;
`;

export { FlagIconImg, ListItemTextStyled, TabStyled };
