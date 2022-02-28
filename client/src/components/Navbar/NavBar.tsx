import * as React from "react";
import useStyles from "./useStyles";
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { Settings, Logout, Person } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import PoolIcon from "@mui/icons-material/Pool";
import { useAuth } from "../../context/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    const classes = useStyles();
    const { loggedInUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("loggedInUser");
    console.log(loggedInUser);

    const handleLogout = () => {
        logout();
    };

    return (
        <Box className={(location.pathname === "/login" || location.pathname === "/signup") ? classes.transparentNavbar : classes.navbarContainer}>
            <AppBar position="static" color={loggedInUser ? "primary" : "transparent"} elevation={0}>
                <Toolbar>
                    <PoolIcon className={classes.logo} />
                    <Typography sx={{ flexGrow: 1 }} variant="body1" className={classes.logo}>
                        Aquatics
                    </Typography>
                    {!loggedInUser && (
                        <>
                            <NavLink to="/login" className="link">
                                <Button variant="outlined" size="large" sx={{ color: "#fff", borderColor: "#fff" }} className={classes.loginButton}>
                                    Login
                                </Button>
                            </NavLink>
                            <NavLink to="/signup" className="link">
                                <Button variant="contained" size="large" sx={{ marginLeft: "15px" }} className={classes.signupButton}>
                                    Sign up
                                </Button>
                            </NavLink>
                        </>
                    )}
                    {loggedInUser && (
                        <>
                            <Typography>Welcome {loggedInUser.name}</Typography>
                            <Avatar alt={loggedInUser.name} src="https://i.kym-cdn.com/photos/images/original/001/370/795/761.jpg" sx={{ width: 30, height: 30, margin: "0px 10px" }} />
                            <Typography onClick={handleLogout} className={classes.logout}>
                                Log out
                            </Typography>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
