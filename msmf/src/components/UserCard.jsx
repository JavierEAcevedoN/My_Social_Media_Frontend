import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api";

const UserCard = ({
    profilePhoto,
    fullName,
    username,
    created,
    updated
}) => {
    const createdTime = created.split("T").join(" ")

    let updatedSpan = updated;

    if (updatedSpan != null) {
        updatedSpan = <span> · {updated.split("T").join(" ")}</span>
    }

    const DEFAULT_PROFILE_PHOTO = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

    const [following, setFollowing] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchIsFollowing = async () => {
            try {
                const { data } = await api.get(`/follows/${user}/${username}`);
                console.log(data);
                
                setFollowing(data)
            } catch (error) {
                console.error(error.response?.data?.message || "Error fetching isFollowing");
            }
        };
        fetchIsFollowing();
    }, [username, user]);

    const toggleFollow = async () => {
        try {
            if (!following) {
                await api.post(`/follows/${user}/${username}`);
            } else {
                await api.delete(`/follows/${user}/${username}`);                
            }
            setFollowing(!following)
            setTimeout(() => window.location.reload(),300)
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching isLiked");
        }
    };

    return (
        <article className="bg-secondary p-4 rounded-xl shadow-md shadow-third border border-third 200 max-w-xl mx-auto w-full">
            <main className="flex items-start justify-between flex-col md:flex-row gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <img 
                        src={profilePhoto || DEFAULT_PROFILE_PHOTO} 
                        alt="User Avatar" 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => e.target.src = DEFAULT_PROFILE_PHOTO}
                        /* TODO: agregar el boton para llevar al perfil */
                    />
                    <div>
                        <h3 className="font-semibold text-primary-text break-all">
                            {fullName}
                        </h3>
                        <div className="text-second-text text-sm">
                            <span>@{username} · </span>
                            <span>{createdTime}</span>
                            {updatedSpan}
                        </div>
                    </div>
                </div>
                <button
                    className={`text-2xl ${following ? "bg-primary hover:bg-third  text-primary-text hover:text-second-text" : "bg-third hover:bg-primary text-second-text hover:text-primary-text"} transition-colors p-2 rounded-2xl outline outline-input `}
                    onClick={toggleFollow}
                >
                    {following ? "Following" : "Follow"}
                </button>
            </main>
        </article>
    );
};

export default UserCard;