import { makeStyles } from "@mui/styles";
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({

    item: {
        width:'90%',
        color: '#ededed' ,
        borderRadius: 5,
        padding: "10px 0px",
        '&:hover' : {
            backgroundColor: 'rgb(54, 59, 91)',
        },
    }
}));

export default useStyles;

