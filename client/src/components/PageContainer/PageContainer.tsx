import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Image from "../../images/background/drop.png";
import NavBar from "../Navbar/NavBar";

interface PageContainerProps {
    children: JSX.Element;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
    return (
        <Box
            sx={{
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
            }}
        >
            <Grid container>
                <Grid item xs={2} md={1}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10} md={11} sx={{ backgroundImage: `url(${Image})` }}>
                    <NavBar />
                    <Box display='flex' justifyContent='center' sx={{height: '92vh'}}>                   
                        {children}              
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PageContainer;
