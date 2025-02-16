import { useContext, useEffect, useState } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";
import AuthContext from "../../context/AuthContext";
import ProfilePage from "../../components/ProfilePage";
import api from "../../api";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { publications } = useContext(PublicationContext);
    const userPublications = publications.filter(pub => pub.username.username === user);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data } = await api.get(`/users/${user}`);
                setProfile(data)
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching userInfo");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) return <p>Loading publications...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    if (!userPublications) return <h1 className="self-center">You don't have publications yet</h1>;

    return (
        <>
            <ProfilePage
                profilePhoto = {profile.profilePhoto || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                fullName = {profile.fullName}
                username = {profile.username}
                created = {profile.created}
                updated = {profile.updated}
                email = {profile.email}
                biography={profile.biography}
                phone = {profile.phone}
                brithDate = {profile.birthDate}
            />
            {userPublications.map(publication => (
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
        </>
    )
};

export default Profile;