import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => ({
    container: {
        position: "absolute",
        minHeight: "100vh",
        top: "0",
    },
    image: {
        backgroundImage: `url(https://variety.com/wp-content/uploads/2017/01/1-1.png)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-Repeat",
        backgroundSize: "cover",
        minHeight: "45vh",
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
