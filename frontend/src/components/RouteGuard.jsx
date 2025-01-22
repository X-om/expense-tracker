import { Navigate } from "react-router-dom";

export default function RouteGuard({children}){
    const token = localStorage.getItem("token");

    if(!token)
        return <Navigate to={'/signin'} replace/>

    return children;
}