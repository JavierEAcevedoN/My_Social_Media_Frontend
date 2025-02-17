import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PublicationProvider } from "./context/PublicationContext";
import Dashboard from "./layout/Dashboard"
import Auth from "./layout/Auth";
import Signin from "./routes/auth/Signin";
import Login from "./routes/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Publications from "./routes/dashboard/Publications";
import Comments from "./routes/dashboard/Comments";
import Likes from "./routes/dashboard/Likes"
import Followers from "./routes/dashboard/Followers";
import Following from "./routes/dashboard/Following";
import Notifications from "./routes/dashboard/Notifications";
import Profile from "./routes/dashboard/Profile";
import User from "./routes/dashboard/User";

function App() {
    return (
        <AuthProvider>
            <PublicationProvider>
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
                                <Route path="comments/:id" element={<Comments />} />
                                <Route path="likes/:id" element={<Likes />} />
                                <Route path="followers" element={<Followers />} />
                                <Route path="following" element={<Following />} />
                                <Route path="notifications" element={<Notifications />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="user/:username" element={<User />} />
                            </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </PublicationProvider>
        </AuthProvider>
    );
}

export default App;