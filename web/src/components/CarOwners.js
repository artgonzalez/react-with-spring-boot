import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SERVER_URL } from "../constants";
import { DataGrid } from "@mui/x-data-grid";
import CarList from "./CarList";

export default function CarOwners() {
    const [owners, setOwners] = useState([]);
    const [carOwner, setCarOwner] = useState(null);

    const columns = [
        {field: 'firstname', headerName: 'First Name', width: 200},
        {field: 'lastname', headerName: 'Last Name', width: 200},
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

    const handleRowClick = (params) => {
        setCarOwner(params.row);
    }

    return(
        <React.Fragment>
            <DataGrid 
                rows = {owners}
                columns={columns}
                getRowId={row => row._links.self.href}
                masterDetail = {true}  
                onRowClick = {handleRowClick}
                //getDetailPanelContent = {getDetailPanelContent}
                //getDetailPanelContent = {({ row }) => <DetailPanelContent row={row} />}
                //getDetailPanelHeight = {getDetailPanelHeight}
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
