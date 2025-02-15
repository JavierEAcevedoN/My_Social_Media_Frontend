import { createContext, useState, useEffect } from "react";
import api from "../api";

const PublicationContext = createContext();

export const PublicationProvider = ({ children }) => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const { data } = await api.get("/publications");

                const updatedPublications = await Promise.all(
                    data.map(async (publication) => {
                        const [likesRes, commentsRes] = await Promise.all([
                            api.get(`/likes/${publication.id}`).catch(() => ({ data: [] })),
                            api.get(`/comments/${publication.id}`).catch(() => ({ data: [] }))
                        ]);

                        return {
                            ...publication,
                            likes: likesRes.data,
                            comments: commentsRes.data
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

    return (
        <PublicationContext.Provider value={{ publications, loading, error, setPublications }}>
            {children}
        </PublicationContext.Provider>
    );
};

export default PublicationContext;