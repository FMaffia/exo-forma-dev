import React from 'react';
import {Button, IconButton, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {hideMessage} from "../store/reducers/uiReducer";

const CustomSnackbar = () => {
    const message = useSelector(state => state.ui.message)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hideMessage())
    };

    const action = (
        <React.Fragment>
            <Button color="primary" size="small" onClick={handleClose}>
                CLOSE
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={message.show}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message.body}
            action={action}
        />
    );
}

export default CustomSnackbar;

