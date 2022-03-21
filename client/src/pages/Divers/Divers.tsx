import useStyles from "./useStyles";
import { Grid, Button, Card, Typography, Box, Avatar, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuth } from "../../context/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { string } from "yup/lib/locale";

interface Diver {
    firstName: String;
    lastName: String;
    status: String;
    avatar: String;
}

const dummyData: Diver[] = [
    {
        firstName: "Alan",
        lastName: "Williams",
        status: "supervisor",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Chum",
        lastName: "Stine",
        status: "supervisor",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Jason",
        lastName: "Nix",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Patrick",
        lastName: "Parson",
        status: "lead",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Jacob",
        lastName: "Weitzel",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Tim",
        lastName: "Sieman",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Grayson",
        lastName: "Caldwell",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Sebastien",
        lastName: "Laifa",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Ariana",
        lastName: "Luzi",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Zach",
        lastName: "???",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Federico",
        lastName: "???",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Jenny",
        lastName: "???",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Sean",
        lastName: "???",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Megan",
        lastName: "???",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Sebatien",
        lastName: "Fortier",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Omar",
        lastName: "???",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Christian",
        lastName: "Nielsen",
        status: "lead",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Berg",
        lastName: "???",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
];

export default function Divers() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();

    return (
        <PageContainer>
            <Grid container sx={{ height: "92vh" }}>
                <Grid item xs={4} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8} md={9}>
                    <Box sx={{ background: "pink", minHeight: '100%' }} textAlign="center">
                        <Box>
                            <Typography variant="h3">Aquatics Team</Typography>
                        </Box>
                        <Box>
                            <Grid container>
                                <Grid item xs={6}>
                                    ola
                                </Grid>
                                <Grid item xs={6}>
                                    ola
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6}>
                                    ola
                                </Grid>
                                <Grid item xs={6}>
                                    ola
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={2}>
                                    ola
                                </Grid>
                                <Grid item xs={2}>
                                    ola
                                </Grid>
                                <Grid item xs={2}>
                                    ola
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
}

{
    /* {loggedInUser && loggedInUser.isAdmin && (
                    <>
                        <Link to="/admin">
                            <Button variant="contained">Go to admin</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="contained">Go to register</Button>
                        </Link>
                    </>
                )} */
}
