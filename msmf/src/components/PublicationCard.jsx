import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../api";
import PublicationForm from "./PublicationFrom";

const PublicationCard = ({
    id,
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
                <span key={index} className="cursor-pointer">{tag}</span>
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
    
    const { user } = useContext(AuthContext);
    
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchIsLiked = async () => {
            try {
                const { data } = await api.get(`/likes/${user}/${id}`);
                setLiked(data)
            } catch (error) {
                console.error(error.response?.data?.message || "Error fetching isLiked");
            }
        };
        fetchIsLiked();
    }, [user, id]);

    const toggleLike = async () => {
        if (!window.location.pathname.includes("likes")) return;

        try {
            if (!liked) {
                await api.post(`/likes/${user}/${id}`);
            } else {
                await api.delete(`/likes/${user}/${id}`);                
            }
            setLiked(!liked)
            setTimeout(() => window.location.reload(),300)
        } catch (error) {
            console.error(error.response?.data?.message || "Error fetching isLiked");
        }
    };

    const [isEditOpen, setIsEditOpen] = useState(false);

    let optionsButton = null;

    const handleDelete = async () => {
        if (window.confirm("Are you sure to delete the publication")) {
            try {
                await api.delete(`/publications/${id}`);
                setTimeout(() => window.location.reload(),300)
            } catch (error) {
                console.error(error.response?.data?.message || "Delete error");
            }
        }
    };

    if (username === user) {
        optionsButton = <div className="flex flex-col gap-2">
                            <button onClick={() => setIsEditOpen(true)} className="text-third-text cursor-pointer">✏️ Edit</button>
                            <button onClick={handleDelete} className="text-input-invalid cursor-pointer">🗑️ Delete</button>
                        </div>
    }

    return (
        <article className="bg-secondary p-4 rounded-xl shadow-lg shadow-third border border-third 200 max-w-xl mx-auto w-full">
            <header className="flex flex-col justify-between items-start sm:flex-row gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <img 
                        src={profilePhoto || DEFAULT_PROFILE_PHOTO} 
                        alt="User Avatar" 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => e.target.src = DEFAULT_PROFILE_PHOTO}
                    />
                    <div>
                        <h3 className="font-semibold text-primary-text break-words break-all">
                            {fullName}
                        </h3>
                        <div className="text-second-text text-sm">
                            <span>@{username} · </span>
                            <span>{createdTime}</span>
                            {updatedSpan}
                        </div>
                    </div>
                </div>
                {optionsButton}
            </header>

            <main className="mt-2">
                <p className="text-primary-text break-words">{content}</p>
                <div className="text-four flex flex-wrap gap-1">
                    {tagsSpan}
                </div>
                {imageLoaded && imgSrc && (
                    <img 
                        src={imgSrc} 
                        alt="Post Image" 
                        className="mt-3 rounded-lg border border-third"
                        onError={() => setImageLoaded(false)}
                    />
                )}
            </main>

            <footer className="mt-3 flex justify-around">
                <Link to={`/dashboard/comments/${id}`} className="text-primary-text flex items-center gap-1 hover:text-blue-500 cursor-pointer transition-colors">
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
                </Link>
                <Link to={`/dashboard/likes/${id}`} onClick={toggleLike} className={`${liked ? "text-like hover:text-primary-text" : "text-primary-text hover:text-like"} flex items-center gap-1 cursor-pointer transition-colors`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill={liked ? "red" : "none"}
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.99 10.99 0 0 0 15 8"
                        />
                    </svg>
                    {likeCount}
                </Link>
            </footer>
            <PublicationForm isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} existingPublication={{ id, content, imgSrc, tags }} />
        </article>
    );
};

export default PublicationCard;