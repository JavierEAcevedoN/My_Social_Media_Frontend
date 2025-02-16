import { useContext } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";
import { Navigate, useParams } from "react-router-dom";
import LikeCard from "../../components/LikeCard";

const Comments = () => {
    const idPublicaton = useParams().id;
    
    const { publications, loading, error } = useContext(PublicationContext);
    const publication = publications.find(i => i.id == idPublicaton)

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    if (!publication) return <Navigate to="/dashboard" replace />;

    const likes = publication.likes;

    return (
        <>
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
                toPrev={".."}
                commentCount={publication.comments.length}
                likeCount={publication.likes.length}
            />
            {likes.map(comment => (
                <LikeCard
                    profilePhoto={comment.username.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    fullName={comment.username.fullName}
                    username={comment.username.username}
                    liked={comment.liked}
                />
            ))}
        </>
    )
};

export default Comments;