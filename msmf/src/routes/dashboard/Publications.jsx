import { useContext } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";

const Publications = () => {
    const { publications, loading, error } = useContext(PublicationContext);

    if (loading) return <p>Loading publications...</p>;
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
                    toPrev={"."}
                    commentCount={publication.comments.length}
                    likeCount={publication.likes.length}
                />
            ))}
        </>
    );
};

export default Publications;