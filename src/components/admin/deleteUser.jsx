import {useState, useEffect} from 'react';
import {DeleteDevicesFromUserFetch, DeleteUserFetch, GetAllUsers} from "../fetches/adminFetch.js";
import './deleteUser.css';
import Navbar from "../navbar/NavBar.jsx";


const DeleteUser = () => {
    const [dataTableEnabled, setDataTableEnabled] = useState([]);

    useEffect(() => {
        getUsersFunction();
    }, []);
    const getUsersFunction = () => {
        GetAllUsers().then(data => data.json())
            .then(data => {createEnabledUsers(data)});
    }


    const createEnabledUsers = (content) => {
        const dataTable2 = [];
        content.map(user => {
            if (user.enabled === true) {
                dataTable2.push(user);
            }
        });
        setDataTableEnabled(dataTable2);
    }

    const changeStatus = (id) => {
        DeleteDevicesFromUserFetch(id);
        DeleteUserFetch(id).then(() => getUsersFunction());
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
            <div className="cover-disable-enable">
                <div className="table-wrapper">
                    <h2>Active Users</h2>
                    <table id="table1">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Enabled</th>
                            <th>Select</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataTableEnabled.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.enabled ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => changeStatus(user.id)} className="button-disable-enable">Delete</button>
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

export default DeleteUser;