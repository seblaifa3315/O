import { makeStyles } from "@mui/styles";
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  transparentNavbar: {
    position: 'absolute',
    zIndex: 100,
    width: '100vw',
  },
  navbarContainer: {
    width: '100vw',
  },
  logo: {
    fontWeight: 700,
    marginRight: '5px',
    [theme.breakpoints.down('md')]:
    {
      color: '#FFF',
    }
  },
  loginButton: {
    width: "100px",
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  signupButton: {
    width: "100px",
  },
  logout: {
    color: "#fff",
    textDecoration: 'underline',
    cursor: "pointer"
  },
}));

export default useStyles;
