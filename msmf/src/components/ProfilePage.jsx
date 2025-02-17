import { useContext, useEffect, useState } from "react";
import EditProfileForm from "./EditProfileForm ";
import AuthContext from "../context/AuthContext";
import api from "../api";

const ProfilePage = ({
    profilePhoto,
    fullName,
    username,
    created,
    updated,
    email,
    biography,
    phone,
    brithDate
}) => {
    const DEFAULT_PROFILE_PHOTO = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

    const createdTime = created.split("T").join(" ")

    let updatedP = updated;

    if (updatedP != null) {
        updatedP = <p className="mt-1 text-sm text-primary-text">{updated.split("T").join("")}</p>
    }

    let biographyP = biography;

    if (biographyP != null) {
        biographyP = <p className="mt-1 text-sm text-primary-text break-all">{biography}</p>
    }

    const { user } = useContext(AuthContext);

    const fetchIsFollowing = async () => {
        try {
            const { data } = await api.get(`/follows/${user}/${username}`); 
            setFollowing(data)
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching isFollowing");
        }
    };

    const notMainProfile = window.location.pathname.includes("profile") || window.location.pathname.includes(user);

    useEffect(() => {
        if (!notMainProfile) {
            fetchIsFollowing();
        }
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

    let optionsButton;

    const [isEditing, setIsEditing] = useState(false);

    const [following, setFollowing] = useState(false);

    if (!notMainProfile) {
        optionsButton = 
        <button
            className={`text-2xl mt-4 ${following ? "bg-primary hover:bg-third  text-primary-text hover:text-second-text" : "bg-third hover:bg-primary text-second-text hover:text-primary-text"} transition-colors p-2 rounded-2xl outline outline-input `}
            onClick={() => toggleFollow()}
        >
            {following ? "Following" : "Follow"}
        </button>
    } else {
        optionsButton = 
        <button 
            className="text-2xl bg-primary hover:bg-third outline outline-input transition-colors text-primary-text px-4 p-2 rounded-2xl mt-4"
            onClick={() => setIsEditing(true)}
        >
            Edit Profile
        </button>
    }

    return (
        <div className="bg-secondary rounded-xl p-4 w-full flex items-center shadow-lg shadow-third justify-around g-1 flex-wrap">
            <div className="w-60">
                <img
                    src={profilePhoto || DEFAULT_PROFILE_PHOTO}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                    onError={(e) => e.target.src = DEFAULT_PROFILE_PHOTO}
                />
                <h2 className="text-xl text-primary-text font-bold break-all">{fullName}</h2>
                <p className="text-second-text break-all">@{username}</p>
                <p className="mt-1 text-sm text-primary-text">{createdTime}</p>
                {updatedP}
            </div>
            <div className="w-72">
                {biographyP}
                <p className="mt-1 text-sm text-primary-text break-all">{email}</p>
                <p className="mt-1 text-sm text-primary-text">{phone}</p>
                <p className="mt-1 text-sm text-primary-text">{brithDate}</p>

                {optionsButton}

                {isEditing && (
                    <EditProfileForm
                        profilePhoto={profilePhoto}
                        fullName={fullName}
                        biography={biography}
                        phone={phone}
                        onClose={() => setIsEditing(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default ProfilePage;