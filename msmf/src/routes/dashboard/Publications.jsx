import { useState, useEffect } from "react";
import api from "../../api";
import PublicationCard from "../../components/PublicationCard";

const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const { data } = await api.get("/publications");

                // Obtener likes y comments en paralelo
                const updatedPublications = await Promise.all(
                    data.map(async (publication) => {
                        const [likesRes, commentsRes] = await Promise.all([
                            api.get(`/likes/${publication.id}`).catch(() => ({ data: [] })),
                            api.get(`/comments/${publication.id}`).catch(() => ({ data: [] }))
                        ]);

                        return {
                            ...publication,
                            likes: likesRes.data.length || 0,
                            comments: commentsRes.data.length || 0
                        };
                    })
                );

                setPublications(updatedPublications);
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching publications");
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="flex flex-col gap-8 mx-1">
            {publications.map((publication) => (
                <PublicationCard
                    key={publication.id}
                    profilePhoto={publication.username.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    fullName={publication.username.fullName}
                    username={publication.username.username}
                    created={publication.created}
                    updated={publication.updated}
                    content={publication.content}
                    tags={publication.tags}
                    imgSrc={publication.imgSrc || ""}
                    commentCount={publication.comments}
                    likeCount={publication.likes}
                />
            ))}
        </div>
    );
};

export default Publications;

/* <PublicationCard
    profilePhoto={"https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
    fullName={"John Doe"}
    username={"johndoe"}
    created={"2020-12-12"}
    updated={"2021-21-21"}
    content={"¡React es increíble! 🚀 ¿Cuál es tu feature favorita?"}
    tags={["#a","#b","#c"]}
    imgSrc={"https://pbs.twimg.com/media/GhccLeQWQAAHthQ?format=png&name=small"}
    commentCount={12}
    likeCount={12}
/> */
