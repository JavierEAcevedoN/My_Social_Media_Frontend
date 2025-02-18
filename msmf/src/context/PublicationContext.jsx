import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import api from "../api";

const PublicationContext = createContext();

export const PublicationProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [publications, setPublications] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublications = async () => {
        try {
            const { data } = await api.get("/publications").catch(() => ({ data: [] }));

            if (!Array.isArray(data)) {
                console.warn("Publications data is not an array:", data);
                setPublications([]);
                return;
            }

            const updatedPublications = await Promise.all(
                data.map(async (publication) => {
                    try {
                        const [likesRes, commentsRes] = await Promise.all([
                            api.get(`/likes/${publication.id}`).catch(() => ({ data: [] })),
                            api.get(`/comments/${publication.id}`).catch(() => ({ data: [] }))
                        ]);

                        return {
                            ...publication,
                            likes: likesRes.data || [],
                            comments: commentsRes.data || []
                        };
                    } catch (err) {
                        console.error("Error fetching publication details:", err);
                        return { ...publication, likes: [], comments: [] };
                    }
                })
            );

            setPublications(updatedPublications);
        } catch (error) {
            console.error("Error fetching publications:", error);
            setError(error.response?.data?.message || "Error fetching publications");
            setPublications([]);
        }
    };

    const fetchFollowing = async () => {
        if (!user) return;

        try {
            const { data } = await api.get(`/follows/following/${user}`).catch(() => ({ data: [] }));

            if (!Array.isArray(data)) {
                console.warn("Following data is not an array:", data);
                setFollowingUsers([]);
                return;
            }

            setFollowingUsers(data);
        } catch (error) {
            console.error("Error fetching following:", error);
            setError(error.response?.data?.message || "Error fetching following");
            setFollowingUsers([]);
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchPublications(), fetchFollowing()])
            .finally(() => setLoading(false));
    }, [user]);

    return (
        <PublicationContext.Provider value={{ publications, loading, error, followingUsers }}>
            {children}
        </PublicationContext.Provider>
    );
};

export default PublicationContext;