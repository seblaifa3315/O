import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    theDiverWrapper: {
        minHeight: 600,
        margin: '0 auto',
        marginBottom: 50,
        backgroundColor: '#fff',
        borderRadius: 2,
      },
      diverInfoContainer: {
        margin: '0 15px',
      },
      diverInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        marginTop: -66,
        border: '5px solid #fff',
      },
      name: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px 0px 15px 0px',
      },
}));

export default useStyles;
