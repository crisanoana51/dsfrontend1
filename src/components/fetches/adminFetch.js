export const AddNewUser = (user) => {
    const token = localStorage.getItem("token");
    return fetch("http://localhost:8080/admin/addUser", {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify(user),
    })
}

export const GetAllUsers = () => {
    const token = localStorage.getItem("token");
    return fetch("http://localhost:8080/admin/findAll", {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    })
}
export const DeleteUserFetch = (id) => {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/admin/deleteUser/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    });
}

export const UpdateUserFetch = (user) => {
    const token = localStorage.getItem("token");
    fetch('http://localhost:8080/admin/updateUser', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    })
}

export const CheckUserDevice = async (user) => {
        const token = localStorage.getItem("token");
        console.log(user);
        return fetch(`http://localhost:8080/admin/getUser/${user}`, {
            method: "GET",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        })
  
}
export const AddNewDevice = (device) => {
    console.log(device)
    return fetch("http://localhost:8081/device/addDevice", {
        method: "POST",
        body: JSON.stringify(device),
        headers: {"Content-Type": "application/json"}
    })
}

export const UpdateDeviceFetch = (device) => {
    fetch('http://localhost:8081/device/updateDevice', {
        method: 'PUT',
        body: JSON.stringify(device),
        headers: {"Content-Type": "application/json"},
    })
}

export const DeleteDevicesFromUserFetch = (id) => {
    fetch(`http://localhost:8081/device/deleteDevicesByUser/${id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
    })
}
export const DeleteDeviceFetch = (id) => {
    return fetch(`http://localhost:8081/device/deleteDevice/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
}
export const GetAllDevices = () => {

    return fetch("http://localhost:8081/device/findAll", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
}