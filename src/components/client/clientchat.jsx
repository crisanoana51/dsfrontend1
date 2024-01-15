import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const ClientChat = ({ userId }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');


    const tabs = [
        {ref: "/", text: "Home"},
        {ref: "/device/findUserDevices", text: "View Devices"},
        {ref: "/device/notifications", text: "View Notifications"},
        {ref: "/chat", text: "Chat"}
    ]

    useEffect(() => {
        const socket = new SockJS('http://localhost:5173/ws');
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            setStompClient(stomp);
            stomp.subscribe(`/user/${userId}/queue/messages`, handleIncomingMessage);
            stomp.send(`/app/chat/getHistory`, {}, userId);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [userId]);

    const handleIncomingMessage = (message) => {
        const messageData = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    const sendMessage = () => {
        if (stompClient && inputMessage.trim() !== '') {
            stompClient.send(`/app/chat/send`, {}, JSON.stringify({
                content: inputMessage,
                recipient: 'admin'  // Change recipient as needed
            }));
            setInputMessage('');
        }
    };

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

export default ClientChat;

