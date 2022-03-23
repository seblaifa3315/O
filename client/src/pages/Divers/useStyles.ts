import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    diverItem: {
        width: "60%",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        cursor: 'pointer',
        "&:hover": {
            background: '#EDF5FC  ',
            borderRadius: 5,
        },
    },
}));

export default useStyles;
