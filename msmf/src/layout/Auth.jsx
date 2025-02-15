import {Outlet} from "react-router-dom";

const Auth = () => {
    return (
        <div className="bg-primary flex justify-center items-center h-screen text-primary-text">
            <Outlet/>
        </div>
    );
};

export default Auth;