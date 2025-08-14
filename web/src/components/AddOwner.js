import React, { useState } from "react";
import Dialog from '@mui/material/Dialog'
import { Button, DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle, TextField, Stack } from "@mui/material";
import { SERVER_URL } from "../constants";

export default function AddOwner(props) {
    const[open, setOpen] = useState(false);
    const[owner, setOwner] = useState({
        firstname: '',
        lastname: ''
    });

    const addOwner = () => {
        
        fetch(SERVER_URL + 'api/owners',
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(owner)
        })
        .then(response => {
            if(response.ok) {
                props.handleFetchOwners();
                props.handleErrorMsg('Onwer Added');
                props.handleOpen(true);
            }
            else {
                props.ErrorMsg('Add Owner Failed');
                props.handleOpen(true);
            }
        })
        .catch(err => console.error(err));
    }    

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setOwner({...owner, [event.target.name]: event.target.value});
    }

    const handleSave = () =>{
        addOwner();
        handleClose();
        setOwner({
            firstname: '',
            lastname: '',
        });
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>New Owner</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Owner</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="First Name" name="firstname" autoFocus variant="standard" value={owner.firstname} onChange={handleChange}/>
                        <TextField label="Last Name" name="lastname" variant="standard" value={owner.lastname} onChange={handleChange}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );    
}