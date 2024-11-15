/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({children}){
    const { token } = useAuth();  

    return (!token) ? <Navigate to="/login"/>: children;
}