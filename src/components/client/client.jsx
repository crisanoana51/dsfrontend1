import React from 'react';
import "./client.css";
import Navbar from "../navbar/NavBar";


export const Client = () => {
    const tabs = [
        {ref: "/", text: "Home"},
        {ref: "/device/findUserDevices", text: "View Devices"},
        {ref: "/device/notifications", text: "View Notifications"},
        {ref: "/chat", text: "Chat"}
    ]
    return (
        <div className="page-container">
            <Navbar buttons={tabs}/>
        </div>
    )
}
