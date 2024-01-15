import React, {useEffect, useState} from "react";
import {GetClientDevices} from "../fetches/clientFetch";
import Navbar from "../navbar/NavBar";
import './client.css';

export const ViewDevices = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchFunction();
    }, []);
    const fetchFunction =  () => {
        const clientId = localStorage.getItem("id");
        GetClientDevices(clientId).then(data => data.json())
            .then(data =>{setData(data); console.log(data)});

    }
    const tabs = [
        {ref: "/", text: "Home"},
        {ref: "/device/findUserDevices", text: "View Devices"},
        {ref: "/device/notifications", text: "View Notifications"},
        {ref: "/chat", text: "Chat"}
    ]

    return(
        <div className="page-container">
            <Navbar buttons={tabs}/>
            <table id="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>MaximumHourlyEnergyConsumption</th>
                </tr>
                </thead>
                <tbody>
                {data.map(device => (
                    <tr key={device.id}>
                        <td>{device.id}</td>
                        <td>{device.name}</td>
                        <td>{device.address}</td>
                        <td>{device.description}</td>
                        <td>{device.maximumHourlyEnergyConsumption}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}