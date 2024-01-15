import {useEffect, useState} from 'react';
import "./addUser.css";
import Select from 'react-select';
import {AddNewUser} from "../fetches/adminFetch.js";
import Navbar from "../navbar/NavBar.jsx";

const AddUser = () => {
    const [popupStyle, showPopup] = useState("hide");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roles2, setSelected] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [responseStatus, setResponseStatus] = useState(0);
    const [content, setContent] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        const role = [roles2.value];
        const user = {email, password, username, firstName, lastName, role};
        AddNewUser(user).then((response) => {
            setContent(response.json());
            setResponseStatus(response.status);
        })
    };
    useEffect(() => {
        console.log('aici')
    }, [])
    useEffect(() => {
        if (responseStatus === 469 && content)
        {
            console.log(content);
            popup();
        }

    }, [content, responseStatus]);

    const popup = () => {
        showPopup("add-popup");
        setTimeout(() => showPopup("hide"), 3000);
    };
    const rolesOptions = [
        {value: "client", label: 'Client'},
        {value: "admin", label: 'Admin'},
    ];

    function checkPassword() {
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        console.log(password, confirmPassword);
        let message = document.getElementById("message");

        if (password.length !== 0) {
            if (password === confirmPassword) {
                message.textContent = "Passwords match";
            } else {
                message.textContent = "Passwords don't match";
            }
        }
    }

    function onFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function onLastNameChange(event) {
        setLastName(event.target.value);
    }

    function onNumberChange(event) {
        setUsername(event.target.value);
    }

    function onEmailChange(event) {
        setEmail(event.target.value);
    }


    function handleChange(selectedOption) {
        setSelected(selectedOption);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function onConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
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
                <h1>Add User</h1>
                <input
                    value={firstName}
                    onChange={onFirstNameChange}
                    type="text"
                    placeholder="first name"
                />
                <input
                    value={lastName}
                    onChange={onLastNameChange}
                    type="text"
                    placeholder="last name"
                />
                <input
                    value={username}
                    onChange={onNumberChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    value={email}
                    onChange={onEmailChange}
                    type="email"
                    placeholder="email"
                />
                <input
                    value={password}
                    onChange={onPasswordChange}
                    type="password"
                    placeholder="password"
                    id="password"
                />
                <input
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                    type="password"
                    placeholder="confirm password"
                    id="confirm-password"
                    onBlur={checkPassword}
                />
                <p id="message"></p>

                <Select
                    options={rolesOptions}
                    onChange={handleChange}
                    placeholder="Select a role"
                />
                <button className="add-button" onClick={handleClick}>Add User</button>
                <div className={popupStyle}>
                    <h3>Login Failed</h3>
                    <p>Username or password incorrect</p>
                </div>
            </div>
        </div>

    );
};
export default AddUser;