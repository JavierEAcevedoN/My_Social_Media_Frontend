import { useState } from "react";

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
        biographyP = <p className="mt-1 text-sm text-primary-text">{biography}</p>
    }

    return (
        <div className="bg-secondary rounded-xl p-4 w-full flex items-center justify-around g-1 flex-wrap">
            <div className="w-48">
                <img
                    src={profilePhoto || DEFAULT_PROFILE_PHOTO}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                    onError={(e) => e.target.src = DEFAULT_PROFILE_PHOTO}
                />
                <h2 className="text-xl text-primary-text font-bold break-all">{fullName}</h2>
                <p className="text-second-text">@{username}</p>
                <p className="mt-1 text-sm text-primary-text">{createdTime}</p>
                {updatedP}
            </div>
            <div>
                {biographyP}
                <p className="mt-1 text-sm text-primary-text">{email}</p>
                <p className="mt-1 text-sm text-primary-text">{phone}</p>
                <p className="mt-1 text-sm text-primary-text">{brithDate}</p>
                <button
                    className="text-2xl mt-4 bg-third text-primary-text p-2 rounded-2xl"
                    variant={following ? "secondary" : "default"}
                    onClick={() => setFollowing(!following)}
                >
                    {following ? "Siguiendo" : "Seguir"}
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;