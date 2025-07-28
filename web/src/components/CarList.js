import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SERVER_URL } from "../constants";
import { DataGrid } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar"

export default function CarList() {
    const[cars, setCars] = useState([]);
    const[open, setOpen] = useState(false);
    const[errorMsg, setErrorMsg] = useState('');
    
    const columns = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'year', headerName: 'Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
              <EditCar
                data={row}
                updateCar={updateCar} />
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>

            <button
                onClick={() => onDelClick(row.id)}>Delete
            </button>
            }
    ];

    useEffect(() => {
        fetchCars()

    }, []);

    const addCar = (car) => {
        fetch(SERVER_URL + 'api/cars',

        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok) {

                fetchCars();
                setErrorMsg('Car Added');
                setOpen(true);
            }

            else {
                setErrorMsg('Car Add Failed');
                setOpen(true);
            }


        })
        .catch(err => console.error(err));
    }

    const fetchCars = () => {
        fetch(SERVER_URL + 'api/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
    } 

    const updateCar = (car, link) => {
        fetch(link,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok) {
                fetchCars();
                setErrorMsg('Car Edited');
                setOpen(true);
            }
            else {
                setErrorMsg('Car Edit Failed');
                setOpen(true);    
            }
        })
    }

    const onDelClick = (url) => {
        if (window.confirm("Are you sure to delete?")) {
            fetch(url,  {method:  'DELETE'})
            .then(response => {
                if( response.ok) {
                    fetchCars();
                    setErrorMsg('Car Deleted');
                    setOpen(true);
                } 
                else {
                    setErrorMsg('Car Delete Failed');
                    setOpen(true);
                }
            })
            .catch(err => console.error(err))
        }    fetch(url,  {method:  'DELETE'})
    }

    return (        
        <div style={{ height: 500, width: '100%' }}>
            <React.Fragment>
                <AddCar addCar={addCar}/>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    getRowId={row => row._links.self.href}/>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message={errorMsg}
                />    
            </React.Fragment>
        </div>
    );
}