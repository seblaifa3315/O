import React from "react";
import useStyles from "./useStyles";
import { Box, Typography } from "@mui/material";
import { LineStyle, Timeline, Person, TrendingUp, PermIdentity, Storefront, AttachMoney, BarChart, MailOutline, DynamicFeed, ChatBubbleOutline, WorkOutline, Report } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const classes = useStyles();
    return (
        <Box className={classes.sidebarContainer}>
            <Box>
                <NavLink to="/divers" className="link">
                    <Box className={classes.item}>
                        <Person sx={{ marginRight: "5px" }} />
                        <Typography variant="subtitle1">Divers</Typography>
                    </Box>
                    <NavLink to="/analytics" className="link">
                        <Box className={classes.item}>
                            <Timeline sx={{ marginRight: "5px" }} />
                            <Typography variant="subtitle1">Analytics</Typography>
                        </Box>
                    </NavLink>
                </NavLink>
            </Box>
        </Box>
    );
}
