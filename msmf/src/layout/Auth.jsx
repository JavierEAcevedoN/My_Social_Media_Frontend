import { useEffect, useState } from "react";
import {Outlet} from "react-router-dom";

const Auth = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="bg-primary flex justify-center items-center h-screen text-primary-text">
            <Outlet/>
        </div>
    );
};

export default Auth;