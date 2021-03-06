import { FormikHelpers } from "formik";
import { Grid } from "@mui/material";
import LoginForm from "./LoginForm/LoginForm";
import useStyles from "./useStyles";
import login from '../../helpers/APICalls/login';
import { useAuth } from '../../context/useAuthContext';

export default function SignUp() {
    const classes = useStyles();
    const { updateLoginContext } = useAuth();

    const handleSubmit = (
        { username, password }: { username: string; password: string },
        { setSubmitting }: FormikHelpers<{ username: string; password: string }>,
      ) => {
        login(username, password).then((data) => {
            if (data.error) {
                console.error({ error: data.error.message });
                setSubmitting(false);
              } else if (data.success) {
                updateLoginContext(data.success);
              } else {
                // should not get here from backend but this catch is for an unknown issue
                console.error({ data });
                setSubmitting(false);
              }
        })
    };

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }} className={classes.form}>
                <LoginForm handleSubmit={handleSubmit} />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} className={classes.image}></Grid>
        </Grid>
    );
}
