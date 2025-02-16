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

    let updatedSpan = updated;

    if (updatedSpan != null) {
        updatedSpan = <span> · {updated.split("T").join(" ")}</span>
    }

    let taggedSpan = tagged;

    if (taggedSpan != null) {
        taggedSpan = <span className="text-four flex flex-wrap gap-1 cursor-pointer">@{tagged}</span>
    }

    const DEFAULT_PROFILE_PHOTO = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

    return (
        <article className="bg-secondary p-4 rounded-xl shadow-md shadow-third border border-third 200 max-w-xl mx-auto w-full">
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