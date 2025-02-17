import { useState } from "react";
import EditProfileForm from "./EditProfileForm ";

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

    const [following, setFollowing] = useState(false);

    const createdTime = created.split("T").join(" ")

    let updatedP = updated;

    if (updatedP != null) {
        updatedP = <p className="mt-1 text-sm text-primary-text">{updated.split("T").join("")}</p>
    }

    let biographyP = biography;

    if (biographyP != null) {
        biographyP = <p className="mt-1 text-sm text-primary-text break-all">{biography}</p>
    }

    let followButton;

    const [isEditing, setIsEditing] = useState(false);

    if (!window.location.pathname.includes("profile")) {
        followButton = <button
                            className={`text-2xl mt-4 ${following ? "bg-primary hover:bg-third  text-primary-text hover:text-second-text" : "bg-third hover:bg-primary text-second-text hover:text-primary-text"} transition-colors p-2 rounded-2xl outline outline-input `}
                            onClick={() => setFollowing(!following)}
                        >
                            {following ? "Following" : "Follow"}
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
                {followButton}

                <button 
                    className="bg-third outline outline-input transition-colors text-primary-text px-4 py-2 rounded-lg hover:bg-primary mt-4"
                    onClick={() => setIsEditing(true)}
                >
                    Edit Profile
                </button>

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