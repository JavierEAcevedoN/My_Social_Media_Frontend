import { useContext } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";

const Publications = () => {
    const { publications, loading, error } = useContext(PublicationContext);

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;


    return (
        <div className="flex flex-col gap-8 m-2">
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
        </div>
    );
};

export default Publications;