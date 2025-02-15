import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    if (isLoading) {
        return <div className="bg-primary text-white flex justify-center items-center h-screen">Cargando...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;