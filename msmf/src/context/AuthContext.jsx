import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const { data } = await axios.post("http://localhost:8080/auth/login", { username, password });
        localStorage.setItem("token", data.token);
        setUser({ username });
        console.log(user);
    };

    const signin = async (username, email, fullName, password, phone, birthDate) => {
        const { data } = await axios.post("http://localhost:8080/auth/register", { username, email, fullName, password, phone, birthDate });
        localStorage.setItem("token", data.token);
        setUser({ username });
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;