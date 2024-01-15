import React, {useState} from "react";
import {AddNewDevice, CheckUserDevice} from "../fetches/adminFetch";
import Navbar from "../navbar/NavBar";


export const AddDevice = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [maximumHourlyEnergyConsumption, setMaximumHourlyEnergyConsumption] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState("");

    const handleClick = async (e) => {
        e.preventDefault()
        const device = {name, description,address, maximumHourlyEnergyConsumption, userId}
        try {
            const response = await CheckUserDevice(device.userId);
            if (!response) throw Error;
            const addResponse = await AddNewDevice(device);
            console.log(addResponse);

        } catch (e) {
            console.log(e);
        }
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const onMaximumHourlyEnergyConsumptionChange = (e) => {
        setMaximumHourlyEnergyConsumption(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const onUserIdChange = (e) => {
        setUserId(e.target.value);
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
            <div className="cover">
                <h1>Add Product</h1>
                <input
                    value={name}
                    onChange={onNameChange}
                    type="text"
                    placeholder="name"
                />
                <input
                    value={address}
                    onChange={onAddressChange}
                    type="text"
                    placeholder="address"
                />
                <input
                    value={maximumHourlyEnergyConsumption}
                    onChange={onMaximumHourlyEnergyConsumptionChange}
                    type="text"
                    placeholder="maximumHourlyConsumption"
                />
                <input
                    value={description}
                    onChange={onDescriptionChange}
                    type="text"
                    placeholder="description"
                /> <input
                value={userId}
                onChange={onUserIdChange}
                type="text"
                placeholder="userId"
            />


                <button className="add-button" onClick={handleClick}>Add Device</button>

            </div>
        </div>
    )
}