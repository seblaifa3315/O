import React from "react";
import useStyles from "./useStyles";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Timeline, Person, Add } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import GroupsIcon from "@mui/icons-material/Groups";

export default function Sidebar() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();
    return (
        <Stack alignItems="center" pt={5} spacing={5} sx={{ bgcolor: "rgb(34, 39, 71)", height: "92vh" }}>
            <NavLink to="/divers" className={`link ${classes.item}`}>
                <Stack alignItems="center" justifyContent='center' alignContent='center'>
                    <GroupsIcon fontSize="large" />
                    <Typography variant='caption'>Team</Typography>
                </Stack>
            </NavLink>
      

            <NavLink to="/analytics" className={`link ${classes.item}`}>
                <Stack alignItems="center">
                    <Timeline fontSize="large" />
                    <Typography variant='caption'>Analytics</Typography>
                </Stack>
            </NavLink>
        

            {loggedInUser && loggedInUser.isAdmin && (
                <NavLink to="/register" className={`link ${classes.item}`}>
                    <Stack alignItems="center">
                        <AddCircleRoundedIcon fontSize="large" />
                        <Typography variant='caption'>Add a diver</Typography>
                    </Stack>
                </NavLink>
            )}
        </Stack>
    );
}
