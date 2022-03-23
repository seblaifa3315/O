import useStyles from "./useStyles";
import { Grid, Button, Card, Typography, Box, Avatar, Stack, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuth } from "../../context/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";

interface Diver {
    firstName: string;
    lastName: string;
    status: string;
    avatar: string;
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
        lastName: "Ristow",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Federico",
        lastName: "Giussi",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Jenny",
        lastName: "Sangster-Williams",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
    {
        firstName: "Sean",
        lastName: "O'Hara",
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
        lastName: "Robles",
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
        firstName: "David",
        lastName: "Berg",
        status: "technician",
        avatar: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
    },
];

const DiverItem: React.FC<{
    avatar: string;
    firstName: string;
    lastName: string;
    status: string;
}> = ({ avatar, firstName, lastName, status }) => {
    const classes = useStyles();

    return (
        <Grid item xs={2}>            
            <Stack pt={1} pb={1} alignItems="center" className={classes.diverItem}>
                <Avatar src={avatar} alt={lastName} sx={{ height: 80, width: 80 }}   />
                <Typography>
                    {firstName} {lastName}
                </Typography>
                <Typography variant='caption' sx={{ color: '#cacaca' }}>
                    {status}
                </Typography>
            </Stack>
        </Grid>
    );
};

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
                    <Box sx={{ height: "100%", display: "flex", flexFlow: "column" }} textAlign="center">
                        <Box>
                            <Typography variant="h3">Aquatics Team</Typography>
                        </Box>
                        <Box sx={{ flexGrow: "1" }}>
                            <Grid container justifyContent="center">
                                {dummyData && dummyData.filter((diver) => diver.status === "supervisor").map((diver) => <DiverItem key={diver.lastName} avatar={diver.avatar} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} />)}
                            </Grid>
                            <Grid container justifyContent="center">
                                {dummyData && dummyData.filter((diver) => diver.status === "lead").map((diver) => <DiverItem key={diver.lastName} avatar={diver.avatar} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} />)}
                            </Grid>
                            <Grid container>
                                {dummyData && dummyData.filter((diver) => diver.status === "technician").map((diver) => <DiverItem key={diver.lastName} avatar={diver.avatar} firstName={diver.firstName} lastName={diver.lastName} status={diver.status} />)}
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
