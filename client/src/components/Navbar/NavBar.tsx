import React, { useState } from "react";
import useStyles from "./useStyles";
import { AppBar, Box, Toolbar, Typography, Button, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import PoolIcon from "@mui/icons-material/Pool";
import { Settings, Logout } from "@mui/icons-material";

const Navbar: React.FC = () => {
    const classes = useStyles();
    const { loggedInUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <Box className={location.pathname === "/login" || location.pathname === "/signup" ? classes.transparentNavbar : classes.navbarContainer}>
            <AppBar position="static" color={loggedInUser ? "primary" : "transparent"} elevation={0} sx={{ minHeight: "8vh" }}>
                <Toolbar>
                    <PoolIcon className={classes.logo} />
                    <Typography sx={{ flexGrow: 1 }} variant="body1" className={classes.logo}>
                        Aquatics
                    </Typography>
                    {loggedInUser && (
                        <>
                            <Typography>Welcome {loggedInUser.firstName}</Typography>
                            <Avatar alt={loggedInUser.firstName} src="https://i.kym-cdn.com/photos/images/original/001/370/795/761.jpg" sx={{ width: 30, height: 30, marginLeft: 3 }} />

                            <IconButton size="large" aria-label="account profile picture" aria-controls="menu-navbar" arais-haspopup="true" onClick={handleMenuOpen} color="inherit">
                                <ArrowDropDownIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Settings</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
