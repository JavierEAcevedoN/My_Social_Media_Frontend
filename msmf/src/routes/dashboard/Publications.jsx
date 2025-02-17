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

/* 
{
    "likes": [
        {
            "id": 1,
            "liked": "2025-02-10",
            "username": {
                "username": "adrsphad",
                "email": "adrsphad@email.com",
                "fullName": "Adrian Sephard",
                "password": "hashedpassword123",
                "phone": "+1 432 655 6543",
                "birthDate": "1978-11-19",
                "created": "2025-02-10T00:00:00",
                "updated": "2025-02-15T13:17:42.190182",
                "biography": "En espera por una mision.",
                "profilePhoto": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80c977ea-f882-4329-8151-3f7670a390e0/de1k16w-6ff1e41c-ca11-4daa-9bec-b18565fefc9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwYzk3N2VhLWY4ODItNDMyOS04MTUxLTNmNzY3MGEzOTBlMFwvZGUxazE2dy02ZmYxZTQxYy1jYTExLTRkYWEtOWJlYy1iMTg1NjVmZWZjOWMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WZmc4mE3NNKBXUih5F-YsumpQdkDDuKrG8SSfGUw2dY",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            },
            "idPublication": {
                "id": 1,
                "content": "Mi primer post en la plataforma!",
                "imgSrc": null,
                "created": "2025-02-10T20:30:00",
                "updated": null,
                "tags": [
                    "#Hola",
                    "#Welcome"
                ],
                "username": {
                    "username": "gfreman",
                    "email": "gfreman@email.com",
                    "fullName": "Gordon Freeman",
                    "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                    "phone": "+1 365 524 1755",
                    "birthDate": "1983-12-24",
                    "created": "2025-02-10T00:00:00",
                    "updated": "2025-02-15T13:19:33.536862",
                    "biography": "Cientifico y Fisico, investigador de {redacted}.",
                    "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                    "authorities": null,
                    "enabled": true,
                    "credentialsNonExpired": true,
                    "accountNonExpired": true,
                    "accountNonLocked": true
                }
            }
        },
        {
            "id": 100,
            "liked": "2025-02-16",
            "username": {
                "username": "jaen",
                "email": "jaen@email.com",
                "fullName": "HeadCrab IRL",
                "password": "$2a$10$ySZerXxryMqAl89U/M0VX.WDLA9Cu72pocAQy3EX/PFhODTEwTgfO",
                "phone": "+11 111 111 1111",
                "birthDate": "2010-02-05",
                "created": "2025-02-13T22:46:07.299182",
                "updated": "2025-02-16T23:02:29.406857",
                "biography": "HeadCrab IRL en 4k del Half Life\nHeadCrab IRL en 4k del Half Life\nHeadCrab IRL en 4k del Half Life\nHeadCrab IRL en 4k del Half Life",
                "profilePhoto": "https://preview.redd.it/headcrab-irl-v0-lba54u08p55a1.jpg?width=640&crop=smart&auto=webp&s=bf1dc72f577e42266f95d21098a2dcd6dd69eae6",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            },
            "idPublication": {
                "id": 1,
                "content": "Mi primer post en la plataforma!",
                "imgSrc": null,
                "created": "2025-02-10T20:30:00",
                "updated": null,
                "tags": [
                    "#Hola",
                    "#Welcome"
                ],
                "username": {
                    "username": "gfreman",
                    "email": "gfreman@email.com",
                    "fullName": "Gordon Freeman",
                    "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                    "phone": "+1 365 524 1755",
                    "birthDate": "1983-12-24",
                    "created": "2025-02-10T00:00:00",
                    "updated": "2025-02-15T13:19:33.536862",
                    "biography": "Cientifico y Fisico, investigador de {redacted}.",
                    "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                    "authorities": null,
                    "enabled": true,
                    "credentialsNonExpired": true,
                    "accountNonExpired": true,
                    "accountNonLocked": true
                }
            }
        }
    ],
    "comments": [
        {
            "id": 1,
            "content": "Hey, yo te conosco",
            "created": "2025-02-10T20:40:00",
            "updated": null,
            "tagged": {
                "username": "gfreman",
                "email": "gfreman@email.com",
                "fullName": "Gordon Freeman",
                "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                "phone": "+1 365 524 1755",
                "birthDate": "1983-12-24",
                "created": "2025-02-10T00:00:00",
                "updated": "2025-02-15T13:19:33.536862",
                "biography": "Cientifico y Fisico, investigador de {redacted}.",
                "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            },
            "idPublication": {
                "id": 1,
                "content": "Mi primer post en la plataforma!",
                "imgSrc": null,
                "created": "2025-02-10T20:30:00",
                "updated": null,
                "tags": [
                    "#Hola",
                    "#Welcome"
                ],
                "username": {
                    "username": "gfreman",
                    "email": "gfreman@email.com",
                    "fullName": "Gordon Freeman",
                    "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                    "phone": "+1 365 524 1755",
                    "birthDate": "1983-12-24",
                    "created": "2025-02-10T00:00:00",
                    "updated": "2025-02-15T13:19:33.536862",
                    "biography": "Cientifico y Fisico, investigador de {redacted}.",
                    "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                    "authorities": null,
                    "enabled": true,
                    "credentialsNonExpired": true,
                    "accountNonExpired": true,
                    "accountNonLocked": true
                }
            },
            "username": {
                "username": "adrsphad",
                "email": "adrsphad@email.com",
                "fullName": "Adrian Sephard",
                "password": "hashedpassword123",
                "phone": "+1 432 655 6543",
                "birthDate": "1978-11-19",
                "created": "2025-02-10T00:00:00",
                "updated": "2025-02-15T13:17:42.190182",
                "biography": "En espera por una mision.",
                "profilePhoto": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/80c977ea-f882-4329-8151-3f7670a390e0/de1k16w-6ff1e41c-ca11-4daa-9bec-b18565fefc9c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgwYzk3N2VhLWY4ODItNDMyOS04MTUxLTNmNzY3MGEzOTBlMFwvZGUxazE2dy02ZmYxZTQxYy1jYTExLTRkYWEtOWJlYy1iMTg1NjVmZWZjOWMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WZmc4mE3NNKBXUih5F-YsumpQdkDDuKrG8SSfGUw2dY",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            }
        },
        {
            "id": 49,
            "content": "comentaria testing cerober de ❤️",
            "created": "2025-02-12T23:01:00",
            "updated": null,
            "tagged": {
                "username": "alix",
                "email": "alix@hotmail.com",
                "fullName": "Alx 11",
                "password": "%$oli",
                "phone": "+2 432 554 2143",
                "birthDate": "1998-12-12",
                "created": "2025-02-12T07:58:32.499942",
                "updated": "2025-02-12T08:17:15.879564",
                "biography": "Acompañante de freeman",
                "profilePhoto": "img.png.jpg",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            },
            "idPublication": {
                "id": 1,
                "content": "Mi primer post en la plataforma!",
                "imgSrc": null,
                "created": "2025-02-10T20:30:00",
                "updated": null,
                "tags": [
                    "#Hola",
                    "#Welcome"
                ],
                "username": {
                    "username": "gfreman",
                    "email": "gfreman@email.com",
                    "fullName": "Gordon Freeman",
                    "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                    "phone": "+1 365 524 1755",
                    "birthDate": "1983-12-24",
                    "created": "2025-02-10T00:00:00",
                    "updated": "2025-02-15T13:19:33.536862",
                    "biography": "Cientifico y Fisico, investigador de {redacted}.",
                    "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                    "authorities": null,
                    "enabled": true,
                    "credentialsNonExpired": true,
                    "accountNonExpired": true,
                    "accountNonLocked": true
                }
            },
            "username": {
                "username": "jean",
                "email": "jean@email.com",
                "fullName": "Javier Eduardo Acevedo Noguera",
                "password": "$2a$10$YOCa/EBJsYFvE0jpGrbIqu15wMJ1uDW11AKeDL9VUoftNbat7FGpG",
                "phone": "+57 731 432 4321",
                "birthDate": "2006-10-19",
                "created": "2025-02-10T00:00:00",
                "updated": "2025-02-16T22:35:27.12395",
                "biography": "Programador apasionado en Spring Boot y React.",
                "profilePhoto": "https://pbs.twimg.com/profile_images/1380210493596520448/PilWVsS6_400x400.jpg",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            }
        },
        {
            "id": 41,
            "content": "dasdsadasdasdsadasdasddasdsdasdsadsadasdsadasdsadsadasdasdsadsadadasdasdasdasdsadasdasdaskdasdksadsaodksakdokasodksaodoaksdksaodoskadkaosdkfkdsgiodfjgifdgjdfigjjdfoigjdvmkcvfsdiogfsdgisdnkcvscdsdsdsdd",
            "created": "2025-02-12T12:06:59.727388",
            "updated": null,
            "tagged": {
                "username": "jean",
                "email": "jean@email.com",
                "fullName": "Javier Eduardo Acevedo Noguera",
                "password": "$2a$10$YOCa/EBJsYFvE0jpGrbIqu15wMJ1uDW11AKeDL9VUoftNbat7FGpG",
                "phone": "+57 731 432 4321",
                "birthDate": "2006-10-19",
                "created": "2025-02-10T00:00:00",
                "updated": "2025-02-16T22:35:27.12395",
                "biography": "Programador apasionado en Spring Boot y React.",
                "profilePhoto": "https://pbs.twimg.com/profile_images/1380210493596520448/PilWVsS6_400x400.jpg",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            },
            "idPublication": {
                "id": 1,
                "content": "Mi primer post en la plataforma!",
                "imgSrc": null,
                "created": "2025-02-10T20:30:00",
                "updated": null,
                "tags": [
                    "#Hola",
                    "#Welcome"
                ],
                "username": {
                    "username": "gfreman",
                    "email": "gfreman@email.com",
                    "fullName": "Gordon Freeman",
                    "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                    "phone": "+1 365 524 1755",
                    "birthDate": "1983-12-24",
                    "created": "2025-02-10T00:00:00",
                    "updated": "2025-02-15T13:19:33.536862",
                    "biography": "Cientifico y Fisico, investigador de {redacted}.",
                    "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                    "authorities": null,
                    "enabled": true,
                    "credentialsNonExpired": true,
                    "accountNonExpired": true,
                    "accountNonLocked": true
                }
            },
            "username": {
                "username": "gfreman",
                "email": "gfreman@email.com",
                "fullName": "Gordon Freeman",
                "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                "phone": "+1 365 524 1755",
                "birthDate": "1983-12-24",
                "created": "2025-02-10T00:00:00",
                "updated": "2025-02-15T13:19:33.536862",
                "biography": "Cientifico y Fisico, investigador de {redacted}.",
                "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            }
        },
        {
            "id": 89,
            "content": "dasdasdsad",
            "created": "2025-02-16T18:36:57.545",
            "updated": null,
            "tagged": null,
            "idPublication": {
                "id": 1,
                "content": "Mi primer post en la plataforma!",
                "imgSrc": null,
                "created": "2025-02-10T20:30:00",
                "updated": null,
                "tags": [
                    "#Hola",
                    "#Welcome"
                ],
                "username": {
                    "username": "gfreman",
                    "email": "gfreman@email.com",
                    "fullName": "Gordon Freeman",
                    "password": "$2a$10$lYxClHkJQU5vfzywCnbG6uVOiIuvQLhqYcJlPx36/CVCG5NK2Aj/W",
                    "phone": "+1 365 524 1755",
                    "birthDate": "1983-12-24",
                    "created": "2025-02-10T00:00:00",
                    "updated": "2025-02-15T13:19:33.536862",
                    "biography": "Cientifico y Fisico, investigador de {redacted}.",
                    "profilePhoto": "https://www.writeups.org/wp-content/uploads/Gordon-Freeman-Half-Life-Portrait-1.jpg",
                    "authorities": null,
                    "enabled": true,
                    "credentialsNonExpired": true,
                    "accountNonExpired": true,
                    "accountNonLocked": true
                }
            },
            "username": {
                "username": "ceroba",
                "email": "ceroba@email.com",
                "fullName": "Ceroba Ketsukane",
                "password": "$2a$10$Q2hqGfHXmGE0HtxVc5ibM.1o1IK6myGD00w4RQDAd9FR.zDyg1XPq",
                "phone": "+33 435 432 9873",
                "birthDate": "2000-05-05",
                "created": "2025-02-12T23:30:00",
                "updated": null,
                "biography": null,
                "profilePhoto": "https://preview.redd.it/art-of-ceroba-from-undertale-yellow-art-by-me-v0-ug3hi30pl3dc1.jpeg?auto=webp&s=00a0f946c4b1abba72ca87959a2b31deefe4e65c",
                "authorities": null,
                "enabled": true,
                "credentialsNonExpired": true,
                "accountNonExpired": true,
                "accountNonLocked": true
            }
        }
    ]
}
*/