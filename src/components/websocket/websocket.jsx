import React, {useState, useEffect} from 'react';
import {Button, Container} from 'reactstrap';
import SockJS from 'sockjs-client';
import {Client, Stomp} from "@stomp/stompjs";
import Notification from "../client/notification.jsx";

function WebSocket() {

    const [notifications, setNotifications] = useState([]);
    const [stompClient, setStompClient] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8082/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log('Websocket connection established');
            stompClient.subscribe('/topic/notification', (message) => {
                console.log(message);
                const notification = JSON.parse(message.body);
                setNotifications((prevNotifications) => [...prevNotifications, notification]);
            });
            setStompClient(stompClient);
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    // useEffect(() => {
    //     debugger
    //     const socket = new SockJS("http://localhost:8082/ws");
    //     const stompClient = new Client({
    //         webSocketFactory: () => socket,
    //         onConnect: (frame) => {
    //             console.log('Connected: ', frame);
    //             debugger
    //             stompClient.subscribe("/topic/notification", message => {
    //                 console.log('Received: ', message.body);
    //             });
    //         },
    //     });
    //
    //     stompClient.activate();
    //
    //     return () => {
    //         if (stompClient.active) {
    //             stompClient.deactivate().then(() => {
    //                 console.log('Disconnected');
    //             });
    //         }
    //     };
    // }, []);


    return (
        <div>
            <Container>
                <h1 className={styles.title} style={textStyle}>Integrated Energy Management System</h1>
                <h1 className={styles.title} style={textStyle}>Client Platform</h1>
                <hr color='black'/>

                <ul className="notification-list">
                    {notifications.map((notification, index) => (
                        <Notification key={index} message={notification}/>
                    ))}
                </ul>
            </Container>
        </div>
    );
}


export default WebSocket;
