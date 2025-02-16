import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const { data } = await axios.post("http://localhost:8080/auth/login", { username, password });

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            setUser(username);

        } catch (error) {
            console.error("Error in Login:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const signin = async (username, email, fullName, password, phone, birthDate) => {
        try {
            const { data } = await axios.post("http://localhost:8080/auth/register", { username, email, fullName, password, phone, birthDate });

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            setUser(username);

        } catch (error) {
            console.error("Error in SignIn:", error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
        window.location = "/"
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");

        if (token && storedUsername) {
            setUser(storedUsername);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, signin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;