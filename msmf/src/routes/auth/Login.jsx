import { useState, useContext } from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            alert("Login succesfull");
            window.location = "/dashboard"
        } catch (error) {
            alert("Login error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-3xl flex flex-col gap-4 shadow-gray-950 text-center w-lg">
            <h2 className="text-xl font-bold mb-4">Sing In</h2>
            <div className="flex flex-col gap-2">
                <label>User:
                    <input className="rounded-2xl outline outline-gray-500 bg-third p-2.5 w-full transition-shadow focus:outline-cyan-300 focus:shadow-input-auth focus:shadow-cyan-600" type="text" placeholder="Usuario" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
            </div>
            <div className="flex flex-col gap-2">
                <label>Password:
                    <input className="rounded-2xl outline outline-gray-500 bg-third p-2.5 w-full transition-shadow focus:outline-cyan-300 focus:shadow-input-auth focus:shadow-cyan-600" type="password" placeholder="Contraseña" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <button className="bg-four text-black font-bold p-3 rounded cursor-pointer transition-colors hover:bg-five w-full" type="submit">Login</button>
            <span>You don't have account? <Link to="/register" className="text-five">SignIn</Link> here</span>
        </form>
    )
};

export default Login;