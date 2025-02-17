import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api";
import { useParams } from "react-router-dom";

const CommentForm = ({ isOpen, onClose }) => {
    const { user } = useContext(AuthContext);
    const idPublicaton = Number(useParams().id);

    const [content, setContent] = useState("");
    const [userTagged, setUserTagged] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const now = new Date();
        const offset = now.getTimezoneOffset();
        const adjustedDate = new Date(now.getTime() - offset * 60000).toISOString();

        const newComment = {
            content,
            created: adjustedDate,
            idPublication: {
                "id": idPublicaton
            },
            username: {
                "username": user
            }
        };
        if (userTagged != "") {
            newComment.tagged = { username: userTagged };
        }        
        try {
            await api.post("/comments", newComment);
            onClose();
            window.location.reload()
        } catch (error) {
            setError(error.response?.data?.message || "Error to create comment check de tag user");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-secondary p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Nueva Publicación</h2>
                {error && <p className="text-red-500 text-sm text-center mb-1">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                        placeholder="Write your opinion"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full resize-none h-60"
                        maxLength={200}
                    />
                    <input
                        type="text"
                        placeholder="tag user (optional)"
                        value={userTagged}
                        onChange={(e) => setUserTagged(e.target.value)}
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full"
                        pattern="^[A-Za-z0-9]*$"
                        maxLength={128}
                    />
                    <div className="flex justify-between">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="bg-third outline outline-input transition-colors text-primary-text px-4 py-2 rounded-lg hover:bg-primary"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-third outline outline-input transition-colors text-primary-text px-4 py-2 rounded-lg hover:bg-five"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentForm;