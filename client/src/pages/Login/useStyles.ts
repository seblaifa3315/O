import { makeStyles } from "@mui/styles";
import nage from '../../images/background/nage.jpeg';


const useStyles = makeStyles(() => ({
    container: {
        position: "absolute",
        minHeight: "100vh",
        top: "0",
    },
    image: {
        backgroundImage: `url(${nage})`,
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
