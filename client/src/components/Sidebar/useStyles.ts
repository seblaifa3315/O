import { makeStyles } from "@mui/styles";
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    sidebarContainer: {
        height: '92vh',
        background: 'rgb(34, 39, 71)',
        padding:'40px 40px',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        color: '#ededed' ,
        borderRadius: 5,
        padding: '5px',
        '&:hover' : {
            backgroundColor: 'rgb(54, 59, 91)',
        },
    }
}));

export default useStyles;

