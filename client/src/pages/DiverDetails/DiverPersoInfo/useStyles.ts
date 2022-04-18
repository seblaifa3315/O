import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
      tracksResumeTitle: {
        fontWeight: 'bold',
      },
      cardAction: {
        display: 'flex',
        justifyContent: "flex-end",
      },
}));

export default useStyles;