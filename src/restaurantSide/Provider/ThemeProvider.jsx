import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    secondary: {
      main: '#854d27',
    },
    background: {
      paper: grey[200]
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: grey[300] 
    },
    text: {
      primary: grey[500],
      secondary: grey[500]
    },
    background: {
      default: grey[900],
      paper: grey[900],
    },
    divider: grey[700],
  },
})
