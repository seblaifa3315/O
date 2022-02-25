import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#214fc6',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 12,
    button: {
      fontWeight: 700,
    },
  },
});