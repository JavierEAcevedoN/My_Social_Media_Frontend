import { useState } from "react";

const PublicationCard = ({
    profilePhoto,
    fullName,
    username,
    created,
    updated,
    content,
    tags,
    imgSrc,
    commentCount,
    likeCount,
}) => {
    let tagsSpan = tags;

    if (tags != null) {
        tagsSpan = tagsSpan.map((tag, index) => {
            return (
                <span key={index} className="cursor-pointer ">{tag}</span>
            )
        })
    }

    const createdTime = created.split("T").join(" ")

    let updatedSpan = updated;

    if (updatedSpan != null) {
        updatedSpan = <span> · {updated.split("T").join(" ")}</span>
    }

    const DEFAULT_PROFILE_PHOTO = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

    const [imageLoaded, setImageLoaded] = useState(true);

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
                    <h3 className="font-semibold text-primary-text">
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
                <p className="text-primary-text">{content}</p>
                <div className="text-third-text flex flex-wrap gap-1">
                    {tagsSpan}
                </div>
                {imageLoaded && imgSrc && (
                    <img 
                        src={imgSrc} 
                        alt="Post Image" 
                        className="mt-3 rounded-lg border border-gray-300"
                        onError={() => setImageLoaded(false)}
                    />
                )}
            </main>

            <footer className="mt-3 flex justify-around">
                <span className="text-primary-text flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1"
                        />
                    </svg>
                    {commentCount}
                </span>
                <span className="text-primary-text flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
                        />
                    </svg>
                    {likeCount}
                </span>
            </footer>
        </article>
    );
};

export default PublicationCard;