import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Snackbar, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import AddCar from "./AddCar";
import EditCar from "./EditCar"

export default function CarList(props) {
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
                handleOpen={setOpen} 
                handleErrorMsg={setErrorMsg} 
                handleFetchCars={fetchCars}
                carsURL={props.owner._links.cars.href}
                />
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>

            <IconButton onClick={() => onDelClick
                (row.id)}>
                <DeleteIcon color="error" />
            </IconButton>
            }
    ];

    useEffect(() => {
        fetchCars(props.owner._links.cars.href)

    }, [props.owner._links.cars.href]);

    const fetchCars = (carsURL) => {
        fetch(carsURL)
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
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
                <Stack mt={2} mb={2}>
                    <AddCar handleOpen={setOpen} handleErrorMsg={setErrorMsg} handleFetchCars={fetchCars} owner={props.owner}/>
                </Stack>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    pageSizeOptions={[3, 6, 9]}
                    initialState={{
                    pagination: {
                      paginationModel: { pageSize: 3, page: 0 }, // Sets initial page size to 10 and starts on the first page
                    },
                }}                
                    showToolbar/>
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