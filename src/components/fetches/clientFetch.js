export const GetClientDevices = (userId) => {
    return fetch(`http://localhost:8081/device/findUserDevices/${userId}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},

    })
}

export const GetConsumptionDevices = (userId) => {
    return fetch("http://localhost:8082/getConsumption", {
        method: "GET",
        headers: {"Content-Type": "application/json"},

    })
}