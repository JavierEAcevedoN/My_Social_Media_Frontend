const CommentCard = ({
    profilePhoto,
    fullName,
    username,
    created,
    updated,
    content,
    tagged
}) => {
    const createdTime = created.split("T").join(" ")

    const goToUserPro = (username) => {
        window.location = `/dashboard/user/${username}`
    };

    let updatedSpan = updated;

    if (updatedSpan != null) {
        updatedSpan = <span> · {updated.split("T").join(" ")}</span>
    }

    let taggedSpan = tagged;

    if (taggedSpan != null) {
        taggedSpan = <span onClick={() => goToUserPro(tagged)} className="text-four flex flex-wrap gap-1 cursor-pointer">@{tagged}</span>
    }

    const DEFAULT_PROFILE_PHOTO = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

    return (
        <article className="bg-secondary p-4 rounded-xl shadow-lg shadow-third border border-third 200 max-w-xl mx-auto w-full">
            <header className="flex items-start flex-col sm:flex-row gap-3">
                <img 
                    src={profilePhoto || DEFAULT_PROFILE_PHOTO} 
                    alt="User Avatar" 
                    className="w-12 h-12 rounded-full"
                    onError={(e) => e.target.src = DEFAULT_PROFILE_PHOTO}
                />
                <div>
                    <h3 onClick={() => goToUserPro(username)} className="font-semibold text-primary-text break-all hover:underline cursor-pointer">
                        {fullName}
                    </h3>
                    <div className="text-second-text text-sm">
                        <span className="break-all">@{username} · </span>
                        <span>{createdTime}</span>
                        {updatedSpan}
                    </div>
                </div>
            </header>

            <main className="mt-2">
                <p className="text-primary-text break-words">{content}</p>
                {taggedSpan}
            </main>
        </article>
    );
};

export default CommentCard;