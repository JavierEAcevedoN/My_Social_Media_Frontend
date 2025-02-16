import { useContext } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";
import { Navigate, useParams } from "react-router-dom";
import LikeCard from "../../components/LikeCard";

const Comments = () => {
    const idPublicaton = useParams().id;
    
    const { publications, loading, error } = useContext(PublicationContext);
    const publication = publications.find(i => i.id == idPublicaton)

    if (loading) return <p className="self-center">Loading likes...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    if (!publication) return <Navigate to="/dashboard" replace />;

    const likes = publication.likes || [];    

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
            {likes.map(like => (
                <LikeCard
                    key={like.id}
                    profilePhoto={like.username.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    fullName={like.username.fullName}
                    username={like.username.username}
                    liked={like.liked}
                />
            ))}
        </>
    )
};

export default Comments;