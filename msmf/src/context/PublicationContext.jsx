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
            console.error("Error fetching publications:", error);
            setError(error.response?.data?.message || "Error fetching publications");
        }
    };

    const fetchFollowing = async () => {
        if (!user) return;

        try {
            const { data } = await api.get(`/follows/following/${user}`);
            setFollowingUsers(data);
        } catch (error) {
            console.error("Error fetching following:", error);
            setError(error.response?.data?.message || "Error fetching following");
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchPublications(), fetchFollowing()]).finally(() => setLoading(false));
    }, [user]);

    return (
        <PublicationContext.Provider value={{ publications, loading, error, followingUsers }}>
            {children}
        </PublicationContext.Provider>
    );
};

export default PublicationContext;