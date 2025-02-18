import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (username, password) => {
        try {
            const { data } = await axios.post("http://localhost:8080/auth/login", { username, password });

            sessionStorage.setItem("token", data.token);
            setUser(decodeToken(data.token));

        } catch (error) {
            console.error("Error in Login:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const signin = async (username, email, fullName, password, phone, birthDate) => {
        try {
            const birth = new Date(birthDate);
            const today = new Date();
            
            const age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            const dayDiff = today.getDate() - birth.getDate();
    
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }
    
            if (age < 14) {
                throw new Error("You need to have 14 or plus to register");
            }

            const { data } = await axios.post("http://localhost:8080/auth/register", { username, email, fullName, password, phone, birthDate });

            sessionStorage.setItem("token", data.token);
            setUser(decodeToken(data.token));

        } catch (error) {
            console.error("Error in SignIn:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
        window.location = "/";
    };

    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.sub;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token) {
            setUser(decodeToken(token));
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;