import React from 'react';
import WebSocket from "../websocket/websocket.jsx";

function Notification({ message }) {
    const extractedMessage = message.message || '';
    console.log('Received message:', message);
    const tabs = [
        {ref: "/", text: "Home"},
        {ref: "/device/findUserDevices", text: "View Devices"},
        {ref: "/device/notifications", text: "View Notifications"},
        {ref: "/chat", text: "Chat"}
    ]

    return (
        <div>

            <div className="notification-item">
                {extractedMessage}
            </div>
            <WebSocket />
        </div>

    );
}
export default Notification;
