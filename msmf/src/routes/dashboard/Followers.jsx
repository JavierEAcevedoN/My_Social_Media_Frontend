import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import UserCard from "../../components/UserCard";
import api from "../../api";

const Followers = () => {
    const { user } = useContext(AuthContext);
    
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const { data } = await api.get(`/follows/followers/${user}`);
                setFollowers(data)
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching followers");
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, []);

    if (loading) return <p>Loading Followers...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    if (!followers) return <h1 className="self-center">You don't have followers</h1>;

    return (
        <>
            {followers.map(follower => (
                <UserCard
                    key={follower.id}
                    profilePhoto={follower.followFrom.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    fullName={follower.followFrom.fullName}
                    username={follower.followFrom.username}
                    created={follower.followFrom.created}
                    updated={follower.followFrom.updated}
                />
            ))}
        </>
    )
};

export default Followers;