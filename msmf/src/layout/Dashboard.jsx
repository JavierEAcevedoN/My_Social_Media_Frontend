import {Link, Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="bg-primary grid grid-cols-3 h-screen text-primary-text">
            {/* Sidebar */}
            <nav className="flex flex-col p-4">
                <Link to="/profile" className="py-2 hover:text-blue-500">Perfil</Link>
                <Link to="/followers" className="py-2 hover:text-blue-500">Seguidores</Link>
                <Link to="/following" className="py-2 hover:text-blue-500">Siguiendo</Link>
            </nav>

            {/* Main Feed con scroll */}
            <section className="overflow-y-auto h-screen border-x border-secondary transition-all scrollbar scrollbar-track-third scrollbar-thumb-secondary hover:scrollbar-thumb-five">
                <Outlet />
            </section>

            {/* Lateral derecho */}
            <aside className="p-4">
                {/* Espacio para tendencias, sugerencias, etc. */}
            </aside>
        </div>
    );
};

export default Dashboard;