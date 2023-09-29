import { blueGrey, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    secondary: {
      main: '#854d27',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: grey[300] 
    },
    text: {
      primary: blueGrey[900],
      secondary: grey[50]
    },
    background: {
      default: grey[900],
      paper: grey[200],
    },
    divider: grey[800],
  },
})