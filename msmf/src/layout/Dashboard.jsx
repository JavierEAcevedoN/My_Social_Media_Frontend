import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="bg-primary grid grid-cols-[28%_44%_28%] h-screen text-primary-text">
            <nav className="flex flex-col items-center">
                <Link to="/dashboard" className="py-2 transition-colors hover:text-four">Home</Link>
                <Link to="./profile" className="py-2 transition-colors hover:text-four">Profile</Link>
                <Link to="./followers" className="py-2 transition-colors hover:text-four">Followers</Link>
                <Link to="./following" className="py-2 transition-colors hover:text-four">Following</Link>
                <Link to="./notifications" className="py-2 transition-colors hover:text-four">Notifications</Link>
                <span className="py-2 transition-colors hover:text-four cursor-pointer" onClick={logout}>LogOut</span>
            </nav>

            {/* arreglar error con el color de la barra scroll */}
            <section className="overflow-y-scroll h-screen border-x border-secondary transition-all scrollbar scrollbar-track-third scrollbar-thumb-secondary hover:scrollbar-thumb-five relative">
                <button 
                    onClick={() => navigate(-1)} 
                    className="absolute top-4 left-4 flex items-center text-primary-text hover:text-four transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m4 10l-.354.354L3.293 10l.353-.354zm16.5 8a.5.5 0 0 1-1 0zM8.646 15.354l-5-5l.708-.708l5 5zm-5-5.708l5-5l.708.708l-5 5zM4 9.5h10v1H4zM20.5 16v2h-1v-2zM14 9.5a6.5 6.5 0 0 1 6.5 6.5h-1a5.5 5.5 0 0 0-5.5-5.5z"/></svg>
                    Volver
                </button>

                <div className="flex flex-col gap-8 m-2 mt-12">
                    <Outlet />
                </div>
            </section>

            <aside className="flex flex-col items-center">
                <p>© Half Media 2025</p>
            </aside>
        </div>
    );
};

export default Dashboard;
