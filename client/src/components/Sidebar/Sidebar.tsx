import React from "react";
import useStyles from "./useStyles";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Timeline, Person, Add } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import GroupsIcon from "@mui/icons-material/Groups";
import logoAlan from "../../images/logo/logoAlan.png";

export default function Sidebar() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();
    return (
        <Stack alignItems="center" pt={3} spacing={5} sx={{ bgcolor: "rgb(34, 39, 71)", height: "100vh" }}>
            <NavLink to={loggedInUser ? "/divers" : "/login"} className={`link ${classes.logo}`}>
                <Stack alignItems="center" justifyContent="center" alignContent="center">
                    <img src={logoAlan} alt="logo" width="50" height="50" />
                </Stack>
            </NavLink>

            <NavLink to="/divers" className={`link ${classes.item}`}>
                <Stack alignItems="center" justifyContent="center" alignContent="center">
                    <GroupsIcon fontSize="large" />
                    <Typography variant="caption">Team</Typography>
                </Stack>
            </NavLink>

            <NavLink to="/analytics" className={`link ${classes.item}`}>
                <Stack alignItems="center">
                    <Timeline fontSize="large" />
                    <Typography variant="caption">Analytics</Typography>
                </Stack>
            </NavLink>
        </Stack>
    );
}
