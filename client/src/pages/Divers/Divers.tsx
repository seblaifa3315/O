import { useEffect, useState } from "react";
import useStyles from "./useStyles";

import { Grid, Button, Card, Typography, Box, Avatar, Stack, Paper, Divider, List, ListItem, ListItemButton, ListItemText, ListItemAvatar } from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuth } from "../../context/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DiversApiData } from "../../interface/DiversApiData";
import { getAllDivers } from "../../helpers/APICalls/getAllDivers";

interface Diver {
    firstName: string;
    lastName: string;
    status: string;
    avatar: string;
    diverId: string;
    shift: string;
}

const DiverItem: React.FC<{
    avatar: string;
    firstName: string;
    lastName: string;
    status: string;
    diverId: string;
    shift: string;
}> = ({ avatar, firstName, lastName, status, diverId, shift }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/diver-details/${diverId}`);
    };

    return (
        <ListItem key={diverId}>
            <ListItemButton onClick={handleOnClick}>
                <ListItemAvatar>
                    <Avatar alt={`${firstName} picture`} src={avatar} />
                </ListItemAvatar>
                <ListItemText id={lastName} primary={`${firstName} ${lastName}`} />
                <ListItemText id={status} primary={`${status}`} />
                <ListItemText id={shift} primary={`${shift}`} />
            </ListItemButton>
        </ListItem>
    );
};

export default function Divers() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();
    const [divers, setDivers] = useState<DiversApiData[] | null>(null);

    useEffect(() => {
        const loadDivers = async () => {
            getAllDivers().then((data: any) => {
                if (data.error) {
                    console.error({ error: data.error.message });
                } else if (data) {
                    setDivers(data);
                } else {
                    console.error({ data });
                }
            });
        };
        loadDivers();
    }, []);
    console.log(loggedInUser);

    return (
        <PageContainer>
            <Box pt={3} pl={20} pr={20}>

                    <Stack direction="row" spacing={5}>
                        <Typography variant="h4" gutterBottom>
                            Aquatic Team
                        </Typography>
                        {loggedInUser && loggedInUser.isAdmin && (
                            <NavLink to="/register" className="link">
                                <Button variant="contained">Add New Diver</Button>
                            </NavLink>
                        )}
                    </Stack>

                    <Stack spacing={1}>
                            <Paper elevation={4} sx={{ overflow:'scroll', opacity: 0.95}}>
                                <List dense>{divers && divers.filter((diver) => diver.status === "supervisor").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} shift={diver.shift} />)}</List>
                            </Paper>
                            <Paper elevation={4} sx={{ overflow:'scroll', opacity: 0.95}}>
                                <List dense>{divers && divers.filter((diver) => diver.status === "lead").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} shift={diver.shift} />)}</List>
                            </Paper>
                            <Paper elevation={4} sx={{ height:'340px', overflow:'scroll', opacity: 0.95}}>
                                <List dense>{divers && divers.filter((diver) => diver.status === "technician").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} shift={diver.shift} />)}</List>
                            </Paper>
                    </Stack>
            </Box>
        </PageContainer>
        //     <Grid container item xs={10} lg={11} sx={{ height: "100%", overflow:'scroll' }}>
        //     <Box sx={{ height: "100%", display: "flex", flexFlow: "column" }} textAlign="center">
        //         <Box pt={2} pb={2}>
        //             <Typography variant="h3">Aquatics Team</Typography>
        //         </Box>
        //         <Box sx={{ flexGrow: "1" }}>

        //             <Grid container justifyContent="center">
        //                 {divers && divers.filter((diver) => diver.status === "supervisor").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} />)}
        //             </Grid>

        //             <Grid container justifyContent="center">
        //                 {divers && divers.filter((diver) => diver.status === "lead").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} />)}
        //             </Grid>

        //             <Grid container>{divers && divers.filter((diver) => diver.status === "technician").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} />)}</Grid>
        //         </Box>
        //     </Box>
        // </Grid>
    );
}
