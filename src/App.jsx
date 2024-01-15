import "./App.css";
import RegisterForm from "./components/register/Registerform.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import {useState} from "react";
import AddUser from "./components/admin/addUser.jsx";
import UpdateUser from "./components/admin/updateUser.jsx";
import DeleteUser from "./components/admin/deleteUser.jsx";
import {Admin} from "./components/admin/admin.jsx";
import {PrivateRoute} from "./PrivateRoute.jsx";
import {AddDevice} from "./components/admin/addDevice.jsx";
import {UpdateDevice} from "./components/admin/updateDevice.jsx";
import {DeleteDevice} from "./components/admin/deleteDevice.jsx";
import {Client} from "./components/client/client.jsx";
import {ViewDevices} from "./components/client/viewDevices.jsx";
import ChatComponent from "./components/chat/chatcomponent.jsx";
//import Adminchat from "./components/admin/adminchat.js";
//import Clientchat from "./components/client/clientchat.js";
//import {Notification} from "./components/client/notification.js";



function App(){

    const user = JSON.parse(localStorage.getItem("user"));
    const [isLoggedIn,setIsLoggedIn] = useState(!!user);

    const handleChangeLoggedInStatus = (isLoggedInValue) => {
        setIsLoggedIn(isLoggedInValue);
    };

    return (
        <div className = "page">
            <Routes>
                <Route
                    path="/login"
                    element={
                        <LoginForm onChangeLoggedInStatus={handleChangeLoggedInStatus} />
                    }
                />
                <Route path="/register" element={<RegisterForm />} />

                <Route element={<PrivateRoute isAuthenticated={isLoggedIn}  />}>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/deleteUser" element={<DeleteUser />} />
                    <Route path="/updateUser" element={<UpdateUser />} />
                    <Route path="/addUser" element={<AddUser />} />
                    <Route path="/addDevice" element={<AddDevice />} />
                    <Route path="/updateDevice" element={<UpdateDevice />} />
                    <Route path="/deleteDevice" element={<DeleteDevice />} />
                    {/*<Route path="/chat" element={<Adminchat />} />*/}
                </Route>

                <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
                <Route path="/client" element={<Client />} />
                <Route path="/device/findUserDevices" element={<ViewDevices/>} />
                    <Route path="/chat" element={<ChatComponent />} />
                </Route>
            </Routes>
        </div>
    )
}

function AppWithRouter() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default AppWithRouter;