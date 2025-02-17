import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import NotificationCard from "../../components/NotificationCard";
import api from "../../api";

const Notifications = () => {
    const { user } = useContext(AuthContext);
    
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await api.get(`/notifications/${user}`);
                setNotifications(data)
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) return <p className="self-center">Loading Notifications...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    if (!notifications) return <h1 className="self-center">You don't have notifications</h1>;

    return (
        <>
            {notifications.map(notification => (
                <NotificationCard
                    key={notification.id}
                    sended={notification.sended}
                    content={notification.content}
                />
            ))}
        </>
    )
};

export default Notifications;