import useStyles from "./useStyles";
import { NavLink, useNavigate } from "react-router-dom";
import { DiversApiData } from "../../../interface/DiversApiData";
import { Typography, Card, CardContent, Stack, List, ListItem, CardActions, Button, CardHeader, CircularProgress, } from "@mui/material";
import { useAuth } from "../../../context/useAuthContext";

import { LocationOn } from "@mui/icons-material";

import CakeIcon from "@mui/icons-material/Cake";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";

interface Props {
    theDiver: DiversApiData;
}

export default function DiverPersoInfo({ theDiver }: Props): JSX.Element {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();
    const navigate = useNavigate();

    if (theDiver === undefined) {
        return <CircularProgress />;
    }
    if (!loggedInUser) {
        return <CircularProgress />;
    }
    if (!theDiver) {
        navigate("/divers");
        return <CircularProgress />;
    }

    return (
        <Card elevation={5} sx={{ flexGrow: 1, opacity: 0.92 }}>
            <CardHeader title="About Me" />
            <CardContent>
                <List disablePadding sx={{ flexGrow: 1 }}>
                    <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                        <Stack direction="row" spacing={1}>
                            <LocationOn fontSize="small" sx={{ color: "#aaaaaa" }} />
                            <Typography variant="body2">
                                <span className={classes.tracksResumeTitle}>From:</span>
                            </Typography>
                            <Typography variant="body2">
                                {theDiver.city.length > 0 && theDiver.country.length > 0
                                    ? `${theDiver.city.charAt(0).toUpperCase() + theDiver.city.slice(1)}, ${theDiver.country.charAt(0).toUpperCase() + theDiver.country.slice(1)}`
                                    : `${theDiver.city.charAt(0).toUpperCase() + theDiver.city.slice(1)} ${theDiver.country.charAt(0).toUpperCase() + theDiver.country.slice(1)}`}
                            </Typography>
                        </Stack>
                    </ListItem>
                    <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                        <Stack direction="row" spacing={1}>
                            <CakeIcon fontSize="small" sx={{ color: "#aaaaaa" }} />
                            <Typography variant="body2">
                                <span className={classes.tracksResumeTitle}>Date Of Birth:</span>
                            </Typography>

                            <Typography variant="body2">{`${theDiver.birthDay} ${theDiver.birthMonth} ${theDiver.birthYear}`}</Typography>
                        </Stack>
                    </ListItem>
                    <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                        <Stack direction="row" spacing={1}>
                            <PhoneIphoneIcon fontSize="small" sx={{ color: "#aaaaaa" }} />
                            <Typography variant="body2">
                                <span className={classes.tracksResumeTitle}>Phone:</span>
                            </Typography>
                            <Typography variant="body2">{theDiver.phone}</Typography>
                        </Stack>
                    </ListItem>
                    <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                        <Stack direction="row" spacing={1}>
                            <EmailIcon fontSize="small" sx={{ color: "#aaaaaa" }} />
                            <Typography variant="body2">
                                <span className={classes.tracksResumeTitle}>Email:</span>
                            </Typography>
                            <Typography variant="body2">{theDiver.email}</Typography>
                        </Stack>
                    </ListItem>
                </List>
            </CardContent>
            {theDiver.userId === loggedInUser?.id && (
                <NavLink to="/update-profile" className="link">
                    <CardActions className={classes.cardAction}>
                        <Button size="small">Edit</Button>
                    </CardActions>
                </NavLink>
            )}
        </Card>
    );
}
