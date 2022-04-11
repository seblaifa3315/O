import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        position: "absolute",
        minHeight: "100vh",
        top: "0",
    },
    form: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        padding: "0% 7%",
    },
}));

export default useStyles;
