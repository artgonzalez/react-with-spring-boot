import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SERVER_URL } from "../constants";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Snackbar, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import AddOwner from "./AddOwner";
import EditOwner from "./EditOwner"
import CarList from "./CarList";

export default function CarOwners() {
    const[errorMsg, setErrorMsg] = useState('');
    const[open, setOpen] = useState(false);
    const[owners, setOwners] = useState([]);
    const[carOwner, setCarOwner] = useState(null);

    const columns = [
        {field: 'firstname', headerName: 'First Name', width: 200},
        {field: 'lastname', headerName: 'Last Name', width: 200},
        {
            field: '_links.owner.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
              <EditOwner
                data={row}
                handleOpen={setOpen} 
                handleErrorMsg={setErrorMsg} 
                handleFetchOwners={fetchOwners}
                />
        }
    ];

    /**const getDetailPanelHeight = React.useCallback(() => 'auto', []);
    const getDetailPanelContent = React.useCallback(({row}) => 
        <CarList carsUrl={row._links.cars.href}/>, 
    []);
    function DetailPanelContent({row}) {
        console.log(row);
        return (<CarList carsUrl={row._links.cars.href}/>);
    }**/

    useEffect(() => {
        fetchOwners()
    }, []);

    const fetchOwners = () => {
        fetch(SERVER_URL + 'api/owners')
        .then(response => response.json())
        .then(data => setOwners(data._embedded.owners))
        .catch(err => console.error(err));
    }    

    const onDelClick = (url) => {}

    const handleRowClick = (params) => {
        setCarOwner(params.row);
    }

    return(
        <React.Fragment>
            <Stack mt={2} mb={2}>
                <AddOwner handleOpen={setOpen} handleErrorMsg={setErrorMsg} handleFetchOwners={fetchOwners}/>
            </Stack>
            <DataGrid 
                rows = {owners}
                columns={columns}
                getRowId={row => row._links.self.href}
                masterDetail = {true}  
                onRowClick = {handleRowClick}
                pageSizeOptions={[3, 6, 9]}
                initialState={{
                    pagination: {
                      paginationModel: { pageSize: 3, page: 0 }, // Sets initial page size to 10 and starts on the first page
                    },
                }}                
                //getDetailPanelContent = {getDetailPanelContent}
                //getDetailPanelContent = {({ row }) => <DetailPanelContent row={row} />}
                //getDetailPanelHeight = {getDetailPanelHeight}
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message={errorMsg}
            />    

            {
            carOwner &&
            <div>
            <CarList owner = {carOwner} />
            </div>
            }
        </React.Fragment>
    );
}
