import useStyles from "./useStyles";
import { useNavigate, NavLink } from "react-router-dom";
import { DiversApiData } from "../../../interface/DiversApiData";
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
import { useAuth } from "../../../context/useAuthContext";
import { LocationOn } from "@mui/icons-material";
import CakeIcon from "@mui/icons-material/Cake";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";

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

interface Props {
    theDiver: DiversApiData;
}

export default function DiverTracks({ theDiver }: Props): JSX.Element {
    const classes = useStyles();
    const navigate = useNavigate();
    const { loggedInUser, profile } = useAuth();

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
    );
}
