import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./layout/Dashboard"
import Auth from "./layout/Auth";
import Signin from "./routes/auth/Signin";
import Login from "./routes/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Publications from "./routes/dashboard/Publications";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Auth />}>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Signin />} />
                    </Route>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                        <Route index element={<Publications />} />
                        <Route path="publications" element={<Publications />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;