import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import {useState} from "react";

var stompClient = null;

const ChatComponent = () => {
    const [isConnected, setIsConnected] = useState(false);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8084/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setIsConnected(true);
        // Any additional logic you want to execute when connected
    };

    const onError = (err) => {
        setIsConnected(false);
        console.log(err);
    };

    // You can use `isConnected` in your component logic or render
    // to conditionally display messages or handle actions based on connection status

    return (
        <div>
            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connect}>Connect</button>
            )}
            {/* Your other JSX elements */}
        </div>
    );
};

export default ChatComponent;
