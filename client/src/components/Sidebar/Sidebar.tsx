import React from "react";
import useStyles from "./useStyles";
import { Box, Typography } from "@mui/material";
import { Timeline, Person, Add } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function Sidebar() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();
    return (
        <Box className={classes.sidebarContainer}>
            <Box>
                <NavLink to="/divers" className="link">
                    <Box className={classes.item}>
                        <Person sx={{ marginRight: "5px" }} />
                        <Typography variant="subtitle1">Divers</Typography>
                    </Box>
                </NavLink>
                <NavLink to="/analytics" className="link">
                    <Box className={classes.item}>
                        <Timeline sx={{ marginRight: "5px" }} />
                        <Typography variant="subtitle1">Analytics</Typography>
                    </Box>
                </NavLink>
                
            </Box>
            {loggedInUser && loggedInUser.isAdmin && (
                    <Box>
                        <NavLink to="/register" className="link">
                            <Box className={classes.item}>
                                <AddCircleRoundedIcon fontSize="large" sx={{ marginRight: "5px" }}/>
                                <Typography variant="subtitle1">Add a diver</Typography>
                            </Box>
                        </NavLink>
                    </Box>
                )}
        </Box>
    );
}
