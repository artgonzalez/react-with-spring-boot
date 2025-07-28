import React, { useState } from "react";
import Dialog from '@mui/material/Dialog'
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";

export default function AddCar(props) {

    const[open, setOpen] = useState(false);
    const[car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        fuel: '',
        price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () =>{
        props.addCar(car);
        handleClose();
        setCar({
            brand: '',
            model: '',
            color: '',
            year: '',
            fuel: '',
            price: ''
        });
    }

    return (
        <div>
            <button onClick={handleClickOpen}>New Car</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <input placeholder="Brand" name="brand" value={car.brand} onChange={handleChange}/>
                    <input placeholder="Model" name="model" value={car.model} onChange={handleChange}/>
                    <input placeholder="Color" name="color" value={car.color} onChange={handleChange}/>
                    <input placeholder="Year" name="year" value={car.year} onChange={handleChange}/>
                    <input placeholder="Price" name="price" value={car.price} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
