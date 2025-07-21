import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SERVER_URL } from "../constants";

export default function CarList() {
    const[cars, setCars] = useState([]);

    useEffect(() => {
        fetch(SERVER_URL + '/api/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <table>
                <caption>Car List</caption>
                <tbody>
                {   
                    cars.map((car, index) =>
                    <tr key={index}>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.color}</td>
                        <td>{car.year}</td>
                        <td>{car.price}</td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    );
}