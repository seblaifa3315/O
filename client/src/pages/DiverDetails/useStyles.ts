import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
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
        margin: '10px 0px 0px 0px',
      },
      tracksResumeTitle: {
        fontWeight: 'bold',
      },
      cardAction: {
        display: 'flex',
        justifyContent: "flex-end",
      },
}));

export default useStyles;
