import React, {useEffect, useState} from "react";
import {GetAllDevices, UpdateDeviceFetch} from "../fetches/adminFetch";
import Navbar from "../navbar/NavBar";

export const UpdateDevice = () => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const handleEdit = (index) => {
        setIsEditing(true);
        setEditedData({...data[index]});
    };

    const handleSave =(index) => {
        const newData = [...data];
        newData[index] = editedData;
        setData(newData);
        UpdateDeviceFetch(editedData);
        setIsEditing(false);
        setEditedData(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(null);
    };

    useEffect(() => {
        fetchFunction();
    }, []);

    const fetchFunction =  () => {
        GetAllDevices().then(data => data.json())
            .then(data => setData(data));
    }


    const tabs = [
        {ref: "/", text: "Home"},
        {ref: "/addUser", text: "Add User"},
        {ref: "/deleteUser", text: "Delete User"},
        {ref: "/updateUser", text: "Update User"},
        {ref: "/addDevice", text: "Add Device"},
        {ref: "/updateDevice", text: "Update Device"},
        {ref: "/deleteDevice", text: "Delete Device"},
        {ref: "/chat", text: "Chat"}
    ]

    return (
        <div className="page-container">
            <Navbar buttons={tabs}/>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>MaximumHourlyEnergyConsumption</th>
                        <th>Description</th>
                        <th>UserId</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((device, index) => (
                        <tr key={device.id}>
                            <td>{device.id}</td>
                            <td>{isEditing && editedData.id === device.id ? (
                                <input
                                    type="text"
                                    value={editedData.name}
                                    onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                                />
                            ) : device.name}</td>
                            <td>{isEditing && editedData.id === device.id ? (
                                <input
                                    type="text"
                                    value={editedData.address}
                                    onChange={(e) => setEditedData({...editedData, address: e.target.value})}
                                />
                            ) : device.address}</td>
                            <td>{isEditing && editedData.id === device.id ? (
                                <input
                                    type="text"
                                    value={editedData.maximumHourlyEnergyConsumption}
                                    onChange={(e) => setEditedData({...editedData, maximumHourlyEnergyConsumption: e.target.value})}
                                />
                            ) : device.maximumHourlyEnergyConsumption}</td>
                            <td>{isEditing && editedData.id === device.id ? (
                                <input
                                    type="text"
                                    value={editedData.description}
                                    onChange={(e) => setEditedData({...editedData, description: e.target.value})}
                                />
                            ) : device.description}</td>
                            <td>{isEditing && editedData.id === device.id ? (
                                <input
                                    type="text"
                                    value={editedData.userId}
                                    onChange={(e) => setEditedData({...editedData, userId: e.target.value})}
                                />
                            ) : device.userId}</td>
                            <td>
                                {isEditing && editedData.id === device.id ? (
                                    <>
                                        <button onClick={() => handleSave(index)} className="button-update">Save</button>
                                        <button onClick={handleCancel} className="button-update">Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEdit(index)} className="button-update">Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}