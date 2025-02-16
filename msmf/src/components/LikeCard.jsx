const UserCard = ({
    profilePhoto,
    fullName,
    username,
    liked
}) => {
    const likedTime = liked.split("T").join(" ")

    const DEFAULT_PROFILE_PHOTO = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

    return (
        <article className="bg-secondary p-4 rounded-xl shadow-md border border-third 200 max-w-xl mx-auto w-full">
            <header className="flex items-start gap-3">
                <img 
                    src={profilePhoto || DEFAULT_PROFILE_PHOTO} 
                    alt="User Avatar" 
                    className="w-12 h-12 rounded-full"
                    onError={(e) => e.target.src = DEFAULT_PROFILE_PHOTO}
                />
                <div>
                    <h3 className="font-semibold text-primary-text break-all">
                        {fullName}
                    </h3>
                    <div className="text-second-text text-sm">
                        <span>@{username} · </span>
                        <span>{likedTime}</span>
                    </div>
                </div>
            </header>
        </article>
    );
};

export default UserCard;