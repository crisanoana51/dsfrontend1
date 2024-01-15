import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({
                                 // eslint-disable-next-line react/prop-types
    isAuthenticated, redirectPath, children
}) => {
    if(!isAuthenticated) {
        return (<Navigate to={redirectPath}/>)
    }
    return children ? children : <Outlet/>
}