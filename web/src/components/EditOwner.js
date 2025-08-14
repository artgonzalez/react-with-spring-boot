import React, { useState } from "react";
import Dialog from '@mui/material/Dialog'
import { DialogActions } from "@mui/material";
import { DialogContent, IconButton } from "@mui/material";
import { DialogTitle, TextField, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"

export default function AddOwner(props) {
    const[open, setOpen] = useState(false);
    const[owner, setOwner] = useState({
        firstname: '',
        lastname: ''
    });

    const editOwner = (link) => {
        
        fetch(link,
        {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(owner)
        })
        .then(response => {
            if(response.ok) {
                props.handleFetchOwners();
                props.handleErrorMsg('Owner Updated');
                props.handleOpen(true);
            }
            else {
                props.ErrorMsg('Update Owner Failed');
                props.handleOpen(true);
            }
        })
        .catch(err => console.error(err));
    }    

    const handleClickOpen = () => {
        setOwner({
            firstname: props.data.row.firstname,
            lastname: props.data.row.lastname,
        });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setOwner({...owner, [event.target.name]: event.target.value});
    }

    const handleSave = () =>{
        editOwner(props.data.id);
        handleClose();
        setOwner({
            firstname: '',
            lastname: '',
        });
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon color="primary" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Owner</DialogTitle>
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