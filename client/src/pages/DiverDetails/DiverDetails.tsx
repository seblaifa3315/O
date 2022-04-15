import { useState, useEffect } from "react";
import useStyles from "./useStyles";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { DiversApiData } from "../../interface/DiversApiData";
import getTheDiver from "../../helpers/APICalls/getTheDiver";
import deleteDiver from "../../helpers/APICalls/deleteDiver";
import {
    Box,
    Grid,
    Typography,
    Paper,
    Card,
    CardMedia,
    CardContent,
    Avatar,
    Rating,
    CircularProgress,
    Divider,
    Stack,
    Checkbox,
    FormGroup,
    FormControlLabel,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Chip,
    FormLabel,
    CardActions,
    Button,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useAuth } from "../../context/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { LocationOn } from "@mui/icons-material";
import Image from "../../images/background/drop.png";
import PoolIcon from "@mui/icons-material/Pool";
import BuildIcon from "@mui/icons-material/Build";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AddTaskIcon from "@mui/icons-material/AddTask";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import format from "date-fns/format";
import CakeIcon from "@mui/icons-material/Cake";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import PageContainer from "../../components/PageContainer/PageContainer";

export default function DiverDetails() {
    const classes = useStyles();
    const [theDiver, setTheDiver] = useState<DiversApiData>();
    const { diverId } = useParams<{ diverId: string | undefined }>();
    const navigate = useNavigate();
    const { loggedInUser, profile } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const loadTheDiver = async () => {
            getTheDiver(diverId).then((data: any) => {
                if (data.error) {
                    console.error({ error: data.error.message });
                } else if (data) {
                    setTheDiver(data);
                } else {
                    console.error({ data });
                }
            });
        };
        loadTheDiver();
    }, [diverId]);

    if (theDiver === undefined) {
        return <CircularProgress />;
    }
    if (!loggedInUser) {
        return <CircularProgress />;
    }
    if (!theDiver) {
        navigate("/divers");
        return <CircularProgress />;
    }

    function createData(track: string, amount: number, ratio: number, last: string) {
        return { track, amount, ratio, last };
    }

    const rows = [
        createData("Console", 55, 10, "3/3/2015"),
        createData("R1", 55, 10, "3/3/2015"),
        createData("R2", 55, 10, "3/3/2015"),
        createData("CR", 55, 10, "3/3/2015"),
        createData("L1", 55, 10, "3/3/2015"),
        createData("L2", 55, 10, "3/3/2015"),
        createData("CL", 55, 10, "3/3/2015"),
        createData("FR", 55, 10, "3/3/2015"),
        createData("FL", 55, 10, "3/3/2015"),
        createData("D/S", 55, 10, "3/3/2015"),
    ];

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        deleteDiver(theDiver.userId).then((data) => {
            if (data.error) {
                console.error({ error: data.error.message });
            } else if (data) {
                handleCloseDialog();
                navigate("/divers");
            } else {
                // should not get here from backend but this catch is for an unknown issue
                console.error({ data });
            }
        });
    };

    return (
        <PageContainer>
            <Grid container item xs={10} lg={11} justifyContent="center" alignItems="center" sx={{ backgroundImage: `url(${Image})`, padding: "20px 0px", height: "100%", overflow: "scroll" }}>
                <Grid item container spacing={3} sx={{ width: "90%" }}>
                    <Grid item xs={12} md={6} sx={{ maxHeight: "100%" }}>
                        <Card elevation={5} sx={{ opacity: 0.95, height: "100%" }}>
                            <CardMedia component="img" height="180" image={theDiver.coverPicture} alt="banner photo" />
                            <CardContent className={classes.diverInfoContainer}>
                                <Box className={classes.diverInfo}>
                                    <Avatar className={classes.avatar} alt="Profile Image" src={theDiver.photo} sx={{ width: 100, height: 100 }} />
                                    <Box className={classes.name}>
                                        <Typography variant="h6">
                                            {theDiver.firstName} {theDiver.lastName}
                                        </Typography>
                                        <Chip size="small" label={theDiver.status.charAt(0).toUpperCase() + theDiver.status.slice(1)} sx={{ minWidth: "100px" }} />
                                    </Box>
                                </Box>
                                <Box sx={{ margin: "20px 0px" }}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="body2">
                                            <span className={classes.tracksResumeTitle}>Shift:</span>
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={theDiver.shift === "day"}
                                                    disableRipple
                                                    sx={{
                                                        "&.Mui-checked": {
                                                            color: "#7a99c2",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Day"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={theDiver.shift === "night"}
                                                    disableRipple
                                                    sx={{
                                                        "&.Mui-checked": {
                                                            color: "#7a99c2",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Show"
                                        />
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="body2">
                                            <span className={classes.tracksResumeTitle}>Hiring Date:</span>
                                        </Typography>
                                        <Typography variant="body2">{format(new Date(theDiver.hiringDate), "d MMMM yyyy")}</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="body2">
                                            <span className={classes.tracksResumeTitle}>Seniority:</span>
                                        </Typography>
                                        <Typography variant="body2">
                                            {formatDuration(
                                                intervalToDuration({
                                                    start: new Date(theDiver.hiringDate),
                                                    end: new Date(),
                                                }),
                                                { format: ["years", "months", "days"] }
                                            )}
                                        </Typography>
                                    </Stack>
                                </Box>

                                <Typography variant="h6">My Certifications</Typography>
                                <List dense disablePadding>
                                    <ListItem sx={{ padding: "0px" }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ height: 25, width: 25 }}>
                                                <PoolIcon fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="ScubaDiving" secondary={theDiver.divingCert.length === 0 ? "None" : theDiver.divingCert.join(", ")} />
                                    </ListItem>
                                    <ListItem sx={{ padding: "0px" }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ height: 25, width: 25 }}>
                                                <BuildIcon fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Gear" secondary={theDiver.gearCert.length === 0 ? "None" : theDiver.gearCert.join(", ")} />
                                    </ListItem>
                                    <ListItem sx={{ padding: "0px" }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ height: 25, width: 25 }}>
                                                <MedicalServicesIcon fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Medical" secondary={theDiver.medicalCert.length === 0 ? "None" : theDiver.medicalCert.join(", ")} />
                                    </ListItem>
                                    <ListItem sx={{ padding: "0px" }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ height: 25, width: 25 }}>
                                                <AddTaskIcon fontSize="small" />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Others" secondary={theDiver.otherCert.length === 0 ? "None" : theDiver.otherCert.join(", ")} />
                                    </ListItem>
                                </List>
                            </CardContent>
                            {loggedInUser.isAdmin && (
                                <CardActions className={classes.cardAction}>
                                    <NavLink to={`/update-diver/${diverId}`} className="link">
                                        <Button size="small">Edit</Button>
                                    </NavLink>
                                    {/* <Button size="small" onClick={handleDelete}>Delete</Button> */}
                                    <Button size="small" onClick={handleClickOpen}>
                                        Delete
                                    </Button>
                                    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth maxWidth="sm">
                                        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">Are you sure you want to delete this diver?</DialogContentText>
                                            <List dense>
                                                <ListItem sx={{ padding: "0px" }}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="Profile Image" src={theDiver.photo} sx={{ width: 40, height: 40 }} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={`${theDiver.firstName} ${theDiver.lastName}`} secondary={theDiver.status} />
                                                </ListItem>
                                            </List>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="outlined" onClick={handleCloseDialog}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" onClick={handleDelete} autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                    <Grid container item xs={12} md={6}>
                        <Stack spacing={2} sx={{ width: "100%" }}>
                            <Card elevation={5} sx={{ flexGrow: 1, opacity: 0.92 }}>
                                <CardHeader title="My Tracks" />
                                <CardContent>
                                    <TableContainer component={Box} sx={{ overflow: "hidden" }}>
                                        <Table aria-label="tracks table" size="small">
                                            <TableHead>
                                                <TableRow sx={{ height: "10px" }}>
                                                    <TableCell>Track</TableCell>
                                                    <TableCell align="right">Amount</TableCell>
                                                    <TableCell align="right">Ratio</TableCell>
                                                    <TableCell align="right">Last</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.track} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                        <TableCell sx={{ maxWidth: "100px" }} component="th" scope="row">
                                                            <FormControlLabel
                                                                sx={{ maxHeight: 15 }}
                                                                control={
                                                                    <Checkbox
                                                                        checked={theDiver.tracks.includes(row.track)}
                                                                        disableRipple
                                                                        sx={{
                                                                            "&.Mui-checked": {
                                                                                color: "#7a99c2",
                                                                            },
                                                                        }}
                                                                    />
                                                                }
                                                                label={row.track}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">{row.amount}</TableCell>
                                                        <TableCell align="right">{row.ratio}%</TableCell>
                                                        <TableCell align="right">{row.last}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Stack direction="row" spacing={5} justifyContent="space-between" sx={{ borderTop: "solid 1px gray" }}>
                                        <Typography>
                                            <span className={classes.tracksResumeTitle}>Shows:</span> 55
                                        </Typography>
                                        <Typography>
                                            <span className={classes.tracksResumeTitle}>Wet:</span> 55 - 30%
                                        </Typography>
                                        <Typography>
                                            <span className={classes.tracksResumeTitle}>DiveCom:</span> 55 - 30%
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                            <Card elevation={5} sx={{ flexGrow: 1, opacity: 0.92 }}>
                                <CardHeader title="About Me" />
                                <CardContent>
                                    <List disablePadding sx={{ flexGrow: 1 }}>
                                        <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                                            <Stack direction="row" spacing={1}>
                                                <LocationOn fontSize="small" sx={{ color: "#aaaaaa" }} />
                                                <Typography variant="body2">
                                                    <span className={classes.tracksResumeTitle}>From:</span>
                                                </Typography>
                                                <Typography variant="body2">
                                                    {theDiver.city.length > 0 && theDiver.country.length > 0
                                                        ? `${theDiver.city.charAt(0).toUpperCase() + theDiver.city.slice(1)}, ${theDiver.country.charAt(0).toUpperCase() + theDiver.country.slice(1)}`
                                                        : `${theDiver.city.charAt(0).toUpperCase() + theDiver.city.slice(1)} ${theDiver.country.charAt(0).toUpperCase() + theDiver.country.slice(1)}`}
                                                </Typography>
                                            </Stack>
                                        </ListItem>
                                        <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                                            <Stack direction="row" spacing={1}>
                                                <CakeIcon fontSize="small" sx={{ color: "#aaaaaa" }} />
                                                <Typography variant="body2">
                                                    <span className={classes.tracksResumeTitle}>Date Of Birth:</span>
                                                </Typography>

                                                <Typography variant="body2">{`${theDiver.birthDay} ${theDiver.birthMonth} ${theDiver.birthYear}`}</Typography>
                                            </Stack>
                                        </ListItem>
                                        <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                                            <Stack direction="row" spacing={1}>
                                                <PhoneIphoneIcon fontSize="small" sx={{ color: "#aaaaaa" }} />
                                                <Typography variant="body2">
                                                    <span className={classes.tracksResumeTitle}>Phone:</span>
                                                </Typography>
                                                <Typography variant="body2">{theDiver.phone}</Typography>
                                            </Stack>
                                        </ListItem>
                                        <ListItem sx={{ padding: "0px 0px 5px 0px" }}>
                                            <Stack direction="row" spacing={1}>
                                                <EmailIcon fontSize="small" sx={{ color: "#aaaaaa" }} />
                                                <Typography variant="body2">
                                                    <span className={classes.tracksResumeTitle}>Email:</span>
                                                </Typography>
                                                <Typography variant="body2">{theDiver.email}</Typography>
                                            </Stack>
                                        </ListItem>
                                    </List>
                                </CardContent>
                                {theDiver.userId === loggedInUser.id && (
                                    <NavLink to="/update-profile" className="link">
                                        <CardActions className={classes.cardAction}>
                                            <Button size="small">Edit</Button>
                                        </CardActions>
                                    </NavLink>
                                )}
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </PageContainer>
    );
}
