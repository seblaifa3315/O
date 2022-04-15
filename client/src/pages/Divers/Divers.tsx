import { useEffect, useState } from "react";
import useStyles from "./useStyles";

import { Grid, Button, Card, Typography, Box, Avatar, Stack, Paper, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
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
}

const DiverItem: React.FC<{
    avatar: string;
    firstName: string;
    lastName: string;
    status: string;
    diverId: string;
}> = ({ avatar, firstName, lastName, status, diverId }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/diver-details/${diverId}`);
    };

    return (
        <Grid item xs={6} md={4} lg={2}>
            <Stack pt={1} pb={1} alignItems="center" onClick={handleOnClick} sx={{ cursor: 'pointer'}}>
                <Avatar src={avatar} alt={lastName} sx={{ height: 80, width: 80 }} />
                <Typography>
                    {firstName} {lastName}
                </Typography>
                <Typography variant="caption" sx={{ color: "#cacaca" }}>
                    {status}
                </Typography>
            </Stack>
        </Grid>
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
                <Grid container item xs={10} lg={11} sx={{ height: "100%", overflow:'scroll' }}>
                    <Box sx={{ height: "100%", display: "flex", flexFlow: "column" }} textAlign="center">
                        <Box pt={2} pb={2}>
                            <Typography variant="h3">Aquatics Team</Typography>
                        </Box>
                        <Box sx={{ flexGrow: "1" }}>
                        
                            <Grid container justifyContent="center">
                                {divers && divers.filter((diver) => diver.status === "supervisor").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} />)}
                            </Grid>
                            
                            <Grid container justifyContent="center">
                                {divers && divers.filter((diver) => diver.status === "lead").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} />)}
                            </Grid>
                            
                            <Grid container>{divers && divers.filter((diver) => diver.status === "technician").map((diver) => <DiverItem key={diver.lastName} avatar={diver.photo} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} diverId={diver.userId} />)}</Grid>
                        </Box>
                    </Box>
                </Grid>
        </PageContainer>
    );
}
