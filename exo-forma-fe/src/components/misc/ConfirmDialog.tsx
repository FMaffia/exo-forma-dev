import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Button} from "@mui/material";

export interface SimpleDialogProps {
    open: boolean;
    body: any;
    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmDialog = (props: SimpleDialogProps) => {
    const {handleClose, open, body, handleConfirm} = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Conferma</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button variant={"contained"} onClick={handleConfirm} autoFocus>
                    Conferma
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
