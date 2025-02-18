import { useContext, useState } from "react";
import PublicationContext from "../../context/PublicationContext";
import PublicationCard from "../../components/PublicationCard";
import PublicationForm from "../../components/PublicationFrom";

const Publications = () => {
    const { publications, loading, error, followingUsers } = useContext(PublicationContext);
    const [isFormOpenSubmit, setIsFormOpenSubmit] = useState(false);
    const [showFollowedOnly, setShowFollowedOnly] = useState(true);
    const [sortByRelevance, setSortByRelevance] = useState(false);

    if (loading) return <p className="self-center">Loading publications...</p>;
    if (error) return <p className="self-center text-red-500">Error: {error}</p>;

    let followedUsers = [] 
    
    if (followingUsers) {
        followedUsers = followingUsers.map(i => i.followTo.username);
    }

    const publicationsFollowed = publications.filter(pub => followedUsers.includes(pub.username.username))

    let filteredPublications = showFollowedOnly
        ? publicationsFollowed
        : publications;

    const noPublications = showFollowedOnly && publicationsFollowed.length === 0;

    filteredPublications = [...filteredPublications].sort((a, b) => {
        if (sortByRelevance) {
            const relevanceA = a.comments.length + a.likes.length;
            const relevanceB = b.comments.length + b.likes.length;
            return relevanceB - relevanceA;
        } else {
            return new Date(b.created || 0) - new Date(a.created || 0);
        }
    });

    return (
        <>
            <div className="flex justify-between p-4 bg-secondary rounded-md mb-4">
                <button 
                    onClick={() => setShowFollowedOnly(!showFollowedOnly)} 
                    className="px-4 py-2 bg-input hover:bg-input-focus text-primary-text rounded-md transition-colors cursor-pointer"
                >
                    {showFollowedOnly ? "See all" : "See following"}
                </button>
                <button 
                    onClick={() => setSortByRelevance(!sortByRelevance)} 
                    className="px-4 py-2 bg-input hover:bg-input-focus text-primary-text rounded-md transition-colors cursor-pointer"
                >
                    {sortByRelevance ? "Order by date" : "Order by relevance"}
                </button>
            </div>

            {noPublications && (
                <p className="text-center text-second-text">No publications here...</p>
            )}

            {!noPublications && filteredPublications.map(publication => (
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

            <button 
                onClick={() => setIsFormOpenSubmit(true)} 
                className="fixed bottom-5 right-5 transition-colors bg-input hover:bg-input-focus text-primary-text px-4 py-2 rounded-full shadow-lg shadow-third cursor-pointer"
            >
                + New publication
            </button>
            <PublicationForm isOpen={isFormOpenSubmit} onClose={() => setIsFormOpenSubmit(false)} />
        </>
    );
};

export default Publications;