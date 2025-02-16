import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import UserCard from "../../components/UserCard";
import api from "../../api";

const Following = () => {
    const { user } = useContext(AuthContext);
    
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const { data } = await api.get(`/follows/following/${user}`);
                setFollowing(data)
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching following");
            } finally {
                setLoading(false);
            }
        };

        fetchFollowing();
    }, []);

    if (loading) return <p>Loading Following...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    if (!following) return <h1 className="self-center">You aren't following</h1>;

    return (
        <>
            {following.map(following => (
                <UserCard
                    key={following.id}
                    profilePhoto={following.followTo.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    fullName={following.followTo.fullName}
                    username={following.followTo.username}
                    created={following.followTo.created}
                    updated={following.followTo.updated}
                />
            ))}
        </>
    )
};

export default Following;