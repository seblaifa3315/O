import { useState, useEffect } from "react";
import useStyles from "./useStyles";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Stack,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from "@mui/material";
import { useAuth } from "../../../context/useAuthContext";
import PoolIcon from "@mui/icons-material/Pool";
import BuildIcon from "@mui/icons-material/Build";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AddTaskIcon from "@mui/icons-material/AddTask";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import format from "date-fns/format";
import deleteDiver from "../../../helpers/APICalls/deleteDiver";
import { DiversApiData } from "../../../interface/DiversApiData";

interface Props {
  theDiver: DiversApiData,
}

export default function DiverAdminInfo({theDiver}: Props): JSX.Element {
  const classes = useStyles();
  const { loggedInUser, profile } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

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

  return (
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
                                    <NavLink to={`/update-diver/${theDiver.userId}`} className="link">
                                        <Button size="small">Edit</Button>
                                    </NavLink>
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
  )
}
