import { useState, useContext } from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const { signin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(username, email, fullName, password, phone, birthDate);
            alert("Signin succesfull");
            window.location = "/dashboard"
        } catch (error) {
            alert("Signin error");
        }
    };

    const today = new Date();
    today.setFullYear(today.getFullYear() - 14);
    const birtDateMinimun = (today.toISOString().split("T")[0]);
    

    return (
        <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-3xl flex flex-col gap-4 shadow-gray-950 text-center w-lg">
            <h2 className="text-xl font-bold mb-4">Sing In</h2>
            <div className="flex flex-col gap-2">
                <label>User:
                    <input className="rounded-2xl outline outline-input bg-third p-2.5 w-full transition-shadow focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow" type="text" placeholder="User" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
            </div>
            <div className="flex flex-col gap-2">
                <label>Email:
                    <input className="rounded-2xl outline outline-input bg-third p-2.5 w-full transition-shadow focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid" type="email" placeholder="Email" name="email" required pattern="^.*@.*\..{3}$" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
            </div>
            <div className="flex flex-col gap-2">
                <label>Full Name:
                    <input className="rounded-2xl outline outline-input bg-third p-2.5 w-full transition-shadow focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow" type="text" placeholder="Full Name" name="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
            </div>
            <div className="flex flex-col gap-2">
                <label>Password:
                    <input className="rounded-2xl outline outline-input bg-third p-2.5 w-full transition-shadow focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid" type="password" placeholder="Password" name="password" required pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%$;&.,#])[A-Za-z\d%$;&.,#]{8,12}$" title="The password already have a Mayus letter, Minus letter, A number, And a special caracter [%$;&.,#]" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <div className="flex flex-col gap-2">
                <label>Phone:
                    <input className="rounded-2xl outline outline-input bg-third p-2.5 w-full transition-shadow focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow" type="text" placeholder="Phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
            </div>
            <div className="flex flex-col gap-2">
                <label>Birth Date:
                    <input className="rounded-2xl outline outline-input bg-third p-2.5 w-full transition-shadow focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow" type="date" name="birthDate" max={birtDateMinimun} required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </label>
            </div>
            <button className="bg-four text-black font-bold p-3 rounded cursor-pointer transition-colors hover:bg-five w-full" type="submit">SignIn</button>
            <span>You have an account? <Link to="/login" className="text-five">Login</Link> here</span>
        </form>
    )
};

export default Signin;