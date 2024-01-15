import React, {useEffect, useState} from "react";
import {DeleteDeviceFetch, GetAllDevices} from "../fetches/adminFetch";
import Navbar from "../navbar/NavBar";

export const DeleteDevice = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getDevicesFunction();
    }, []);
    const getDevicesFunction = () => {
        GetAllDevices().then(data => data.json())
            .then(data => {setData(data)});
    }

    const changeStatus = (id) => {
        DeleteDeviceFetch(id).then(() => getDevicesFunction());
    }
    const tabs = [
        {ref: "/", text: "Home"},
        {ref: "/addUser", text: "Add User"},
        {ref: "/disableUser", text: "Delete User"},
        {ref: "/updateUser", text: "Update User"},
        {ref: "/addDevice", text: "Add Device"},
        {ref: "/deleteDevice", text: "Delete Device"},
        {ref: "/updateDevice",text: "Update Device"},
        {ref: "/chat", text: "Chat"}
    ]


    return (
        <div className="page-container">
            <Navbar buttons={tabs}/>
            <div className="tabel-container">
                <div className="table-wrapper">
                    <table id="table1">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>MaximumHourlyEnergyConsumption</th>
                            <th>UserId</th>
                            <th>Enabled</th>
                            <th>Select</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(device => (
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.name}</td>
                                <td>{device.address}</td>
                                <td>{device.maximumHourlyEnergyConsumption}</td>
                                <td>{device.description}</td>
                                <td>{device.userId}</td>
                                <td>
                                    <button onClick={() => changeStatus(device.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}