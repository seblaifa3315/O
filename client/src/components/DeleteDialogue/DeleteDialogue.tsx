import React, { useState } from "react";
import useStyles from "./useStyles";
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
  import deleteDiver from "../../helpers/APICalls/deleteDiver";
  import { useParams, useNavigate, NavLink } from "react-router-dom";

const DeleteDialogue: React.FC <{
    avatar: string;
    firstName: string;
    lastName: string;
    status: string;
    diverId: string;
}> = ({avatar, firstName, lastName, status, diverId}) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = () => {
        deleteDiver(diverId).then((data) => {
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
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Are you sure you want to delete this diver?</DialogContentText>
                <List dense>
                    <ListItem sx={{ padding: "0px" }}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Image" src={avatar} sx={{ width: 40, height: 40 }} />
                        </ListItemAvatar>
                        <ListItemText primary={`${firstName} ${lastName}`} secondary={status} />
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
    );
}

export default DeleteDialogue;
