import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from "sockjs-client";

const AdminChat = ({ adminId }) => {

    const clientId = localStorage.getItem("id");
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const socket = new SockJS('http://localhost:8083/ws');
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            setStompClient(stomp);
            stomp.subscribe('/user/queue/messages', handleIncomingMessage);
            stomp.send('/app/chat/getHistory', {}, 'admin');
        });

        // return () => {
        //     if (stompClient) {
        //         stompClient.disconnect();
        //     }
        // };
    }, []);

    const handleIncomingMessage = (message) => {
        const messageData = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    const sendMessage = () => {
        if (stompClient && inputMessage.trim() !== '') {
            stompClient.send(`/app/chat/send`, {}, JSON.stringify({
                content: inputMessage,
                recipient: {clientId}
            }));
            setInputMessage('');
        }
    };

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
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default AdminChat;
