import { useContext, useEffect, useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserCard from "../components/UserCard";
import api from "../api";

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const [users, setUsers] = useState([]);

    const randomUsers = useMemo(() => {
        if (users.length <= 3) return users;
    
        return [...users]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }, [users]);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get("/users");
            setUsers(data)
            randomUsers
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching users");
        }
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="bg-primary grid grid-cols-[25%_50%_25%] h-screen text-primary-text">
            <nav className="flex flex-col items-start px-6 py-4 border-r border-secondary overflow-y-auto h-screen transition-all scrollbar scrollbar-track-third dark:scrollbar-track-[#333] scrollbar-thumb-secondary dark:scrollbar-thumb-[#2c2c2c] hover:scrollbar-thumb-five dark:hover:scrollbar-thumb-[#06c4d3]">
                <Link to="/dashboard" className="flex items-center gap-4 py-3 text-xl font-medium transition-colors hover:text-four flex-col break-all md:break-normal md:flex-row">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>
                    Home
                </Link>
                <Link to="./profile" className="flex items-center gap-4 py-3 text-xl font-medium transition-colors hover:text-four flex-col break-all md:break-normal md:flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 12 12"><path fill="currentColor" d="M4 8a4.03 4.03 0 0 0-3.995 3.41c-.04.31.191.59.504.59h6.982c.313 0 .545-.28.504-.59C7.698 9.45 6 8 4 8m0-6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"/></svg>
                    Profile
                </Link>
                <Link to="./followers" className="flex items-center gap-4 py-3 text-xl font-medium transition-colors hover:text-four flex-col break-all md:break-normal md:flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 14 14">
                    <path fill="currentColor" d="M4 8a4.03 4.03 0 0 0-3.995 3.41c-.04.31.191.59.504.59h6.982c.313 0 .545-.28.504-.59C7.698 9.45 6 8 4 8m0-6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"/>
                    <path fill="currentColor" d="M10 1v2h2v1h-2v2h-1V4H7V3h2V1z"/>
                </svg>
                    Followers
                </Link>
                <Link to="./following" className="flex items-center gap-4 py-3 text-xl font-medium transition-colors hover:text-four flex-col break-all md:break-normal md:flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 14 14">
                    <path fill="currentColor" d="M4 8a4.03 4.03 0 0 0-3.995 3.41c-.04.31.191.59.504.59h6.982c.313 0 .545-.28.504-.59C7.698 9.45 6 8 4 8m0-6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"/>
                    <path fill="currentColor" d="M9 3l1.5 1.5L13 2l1 1-3 3L8 5z"/>
                </svg>
                    Following
                </Link>
                <Link to="./notifications" className="flex items-center gap-4 py-3 text-xl font-medium transition-colors hover:text-four flex-col break-all md:break-normal md:flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71z"/></svg>
                    Notifications
                </Link>
                <button
                    className="flex items-center gap-4 py-3 text-xl font-medium transition-colors hover:text-four flex-col break-all md:break-normal md:flex-row"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? (
                        <>
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path></svg>
                            Light Mode
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.42 1.41 1.79 1.8A7.988 7.988 0 0 0 4 12h2a6 6 0 0 1 6-6V4a7.988 7.988 0 0 0-5.24 1.84zM12 22c4.41 0 8-3.59 8-8h-2a6 6 0 0 1-6 6v2z"></path></svg>
                            Dark Mode
                        </>
                    )}
                </button>
                <span className="flex items-center gap-4 py-3 text-xl font-medium transition-colors hover:text-four cursor-pointer flex-col break-all md:break-normal md:flex-row" onClick={logout}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4h4v-6z"></path><path d="M21 3H3v2h18V3zm0 16H3v2h18v-2z"></path></svg>
                    LogOut
                </span>
            </nav>

            <section className="overflow-y-scroll h-screen border-x border-secondary transition-all scrollbar scrollbar-track-third dark:scrollbar-track-[#333] scrollbar-thumb-secondary dark:scrollbar-thumb-[#2c2c2c] hover:scrollbar-thumb-five dark:hover:scrollbar-thumb-[#06c4d3] relative">
                <button 
                    onClick={() => navigate(-1) || navigate("/dashboard")} 
                    className="absolute top-4 left-4 flex items-center text-primary-text  hover:text-four transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m4 10l-.354.354L3.293 10l.353-.354zm16.5 8a.5.5 0 0 1-1 0zM8.646 15.354l-5-5l.708-.708l5 5zm-5-5.708l5-5l.708.708l-5 5zM4 9.5h10v1H4zM20.5 16v2h-1v-2zM14 9.5a6.5 6.5 0 0 1 6.5 6.5h-1a5.5 5.5 0 0 0-5.5-5.5z"/></svg>
                    Volver
                </button>

                <div className="flex flex-col gap-8 m-2 mt-12">
                    <Outlet />
                </div>
            </section>

            <aside className="overflow-y-auto h-screen transition-all scrollbar scrollbar-track-third dark:scrollbar-track-[#333] scrollbar-thumb-secondary dark:scrollbar-thumb-[#2c2c2c] hover:scrollbar-thumb-five dark:hover:scrollbar-thumb-[#06c4d3]">
                    <div className="flex flex-col gap-8 items-center m-2">
                        <h2 className="text-lg font-semibold text-primary-text break-all md:break-normal">Recomended users</h2>
                        {users.length === 0 ? <p>Cargando usuarios...</p> : randomUsers.map(user => (
                            <UserCard key={user.username} {...user} />
                        ))}
                        <p>© Half Media 2025</p>
                    </div>
            </aside>
        </div>
    );
};

export default Dashboard;