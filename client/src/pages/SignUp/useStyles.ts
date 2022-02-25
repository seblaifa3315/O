import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        position: "absolute",
        minHeight: "100vh",
        top: "0",
    },
    image: {
        backgroundImage: `url(https://img2.10bestmedia.com/Images/Photos/229823/p-home-bg_55_660x440_201404241116.jpg)`,
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
