import React from "react";
import useStyles from "./useStyles";
import { Box, Typography, Divider, Grid, Stack } from "@mui/material";
import { Timeline, Person, Add } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import GroupsIcon from "@mui/icons-material/Groups";

export default function Sidebar() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();
    return (
        <Box className={classes.sidebarContainer}>
            <NavLink to="/divers" className="link">
                <Stack className={classes.item}>
                    <GroupsIcon />
                    {/* <Typography variant="subtitle1">Divers</Typography> */}
                </Stack>
            </NavLink>

            <NavLink to="/analytics" className="link">
                <Stack className={classes.item}>
                    <Timeline />
                    {/* <Typography variant="subtitle1">Analytics</Typography> */}
                </Stack>
            </NavLink>

            {loggedInUser && loggedInUser.isAdmin && (
                <NavLink to="/register" className="link">
                    <Box className={classes.item}>
                        <AddCircleRoundedIcon />
                        {/* <Typography variant="subtitle1">Add a diver</Typography> */}
                    </Box>
                </NavLink>
            )}
        </Box>
    );
}

