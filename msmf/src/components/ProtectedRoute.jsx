import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log(user);
    
    return user == null ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;