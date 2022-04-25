import { useEffect, useState } from "react";
import useStyles from "./useStyles";

import { Grid, Button, Card, Typography, Box, Avatar, Stack, Paper, Divider, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuth } from "../../context/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { DiversApiData } from "../../interface/DiversApiData";
import { getAllDivers } from "../../helpers/APICalls/getAllDivers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialogue from "../../components/DeleteDialogue/DeleteDialogue";
import deleteDiver from "../../helpers/APICalls/deleteDiver";

interface Diver {
    firstName: string;
    lastName: string;
    status: string;
    avatar: string;
    diverId: string;
    shift: string;
    isAdmin: Boolean | null | undefined;
}

const DiverItem: React.FC<{
    avatar: string;
    firstName: string;
    lastName: string;
    status: string;
    diverId: string;
    shift: string;
    isAdmin: Boolean | null | undefined;

}> = ({ avatar, firstName, lastName, status, diverId, shift, isAdmin }) => {
    const classes = useStyles();
    const navigate = useNavigate();


    const handleOnClick = () => {
        navigate(`/diver-details/${diverId}`);
    };
    const handleEdit = () => {
        navigate(`/update-diver/${diverId}`);
    };


    return (
        <ListItem
            key={diverId}
            secondaryAction={
                isAdmin && (
                    <Stack direction="row" spacing={1}>
                        <EditIcon fontSize="small" onClick={handleEdit} sx={{ cursor: "pointer" }} />
                        <DeleteIcon fontSize="small" color="error" onClick={() => alert("need to implement the functionality")} sx={{ cursor: "pointer" }} />
                    </Stack>
                )
            }
            disablePadding
        >
            <ListItemButton onClick={handleOnClick}>
                <Grid container spacing={1}>
                    <Grid item xs={6} md={4}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar alt={`${firstName} picture`} src={avatar} sx={{ height: "30px", width: "30px" }} />
                            <Typography variant="body2">
                                {firstName} {lastName}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} md={2}>
                        <Typography variant="caption">{status}</Typography>
                    </Grid>
                    <Grid item xs={3} md={2}>
                        <Typography variant="caption">{shift}</Typography>
                    </Grid>
                </Grid>
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

    return (
        <PageContainer>
            <Box  sx={{ width: '95%', height: '92vh', overflowY: 'scroll'}}>
                <Stack direction="row" spacing={3}>
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
                    <Paper elevation={0} sx={{ opacity: 0.95, borderRadius: 0 }}>
                        <List dense>
                            {divers && divers.filter((diver) => diver.status === "supervisor").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} shift={diver.shift} isAdmin={loggedInUser?.isAdmin}  />)}
                        </List>
                    </Paper>
                    <Paper elevation={0} sx={{ opacity: 0.95, borderRadius: 0 }}>
                        <List dense>
                            {divers && divers.filter((diver) => diver.status === "lead").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} shift={diver.shift} isAdmin={loggedInUser?.isAdmin} />)}
                        </List>
                    </Paper>
                    <Paper elevation={0} sx={{ opacity: 0.95, borderRadius: 0 }}>
                        <List dense>
                            {divers && divers.filter((diver) => diver.status === "technician").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} shift={diver.shift} isAdmin={loggedInUser?.isAdmin} />)}
                        </List>
                    </Paper>
                </Stack>
            </Box>
        </PageContainer>
    );
}
