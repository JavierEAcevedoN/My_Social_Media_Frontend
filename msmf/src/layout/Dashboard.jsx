import {Link, Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="bg-primary grid grid-cols-[28%_44%_28%] h-screen text-primary-text">
            <nav className="flex flex-col items-center">
                <Link to="/dashboard" className="py-2 transition-colors hover:text-four">Home</Link>
                <Link to="./profile" className="py-2 transition-colors hover:text-four">Profile</Link>
                <Link to="./followers" className="py-2 transition-colors hover:text-four">Followers</Link>
                <Link to="./following" className="py-2 transition-colors hover:text-four">Folloing</Link>
                <Link to="./notifications" className="py-2 transition-colors hover:text-four">Notifications</Link>
            </nav>

            <section className="overflow-y-auto h-screen border-x border-secondary transition-all scrollbar scrollbar-track-third scrollbar-thumb-secondary hover:scrollbar-thumb-five">
                <div className="flex flex-col gap-8 m-2">
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