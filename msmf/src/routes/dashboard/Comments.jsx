import { useContext } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";
import { Navigate, useParams } from "react-router-dom";
import CommentCard from "../../components/CommentCard";

const Comments = () => {
    const idPublicaton = useParams().id;
    
    const { publications, loading, error } = useContext(PublicationContext);
    const publication = publications.find(i => i.id == idPublicaton)

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    if (!publication) return <Navigate to="/dashboard" replace />;

    const comments = publication.comments || [];

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
                commentCount={publication.comments.length}
                likeCount={publication.likes.length}
            />
            {comments.map(comment => (
                <CommentCard
                    key={comment.id}
                    profilePhoto={comment.username.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    fullName={comment.username.fullName}
                    username={comment.username.username}
                    created={comment.created}
                    updated={comment.updated}
                    content={comment.content}
                    tagged={comment.tagged?.username || null}
                />
            ))}
        </>
    )
};

export default Comments;