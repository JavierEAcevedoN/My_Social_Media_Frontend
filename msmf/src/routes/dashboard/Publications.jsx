import { useContext, useState } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";
import PublicationForm from "../../components/PublicationFrom";

const Publications = () => {
    const { publications, loading, error } = useContext(PublicationContext);
    const [isFormOpenSubmit, setIsFormOpenSubmit] = useState(false);

    if (loading) return <p className="self-center">Loading publications...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    return (
        <>
            {publications.map(publication => (
                <PublicationCard
                    key={publication.id}
                    id={publication.id}
                    profilePhoto={publication.username.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    fullName={publication.username.fullName}
                    username={publication.username.username}
                    created={publication.created}
                    updated={publication.updated}
                    content={publication.content}
                    tags={publication.tags}
                    imgSrc={publication.imgSrc || ""}
                    commentCount={publication.comments.length}
                    likeCount={publication.likes.length}
                />
            ))}
            <button 
                onClick={() => setIsFormOpenSubmit(true)} 
                className="fixed bottom-5 right-5 transition-colors bg-input hover:bg-input-focus text-primary-text px-4 py-2 rounded-full shadow-lg shadow-third cursor-pointer"
            >
                + New publication
            </button>
            <PublicationForm isOpen={isFormOpenSubmit} onClose={() => setIsFormOpenSubmit(false)} />
        </>
    );
};

export default Publications;