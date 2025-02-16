import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api";

const PublicationForm = ({ isOpen, onClose }) => {
    const { user } = useContext(AuthContext);
    
    const [content, setContent] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const newPublication = {
            content,
            created: new Date().toISOString(),
            tags: tags.split(" ").filter(tag => tag.startsWith("#")), // Filtra solo los hashtags
            imgSrc,
            username: {
                "username":user
            }
        };

        try {
            await api.post("/publications", newPublication);
            onClose();
            window.location.reload()
        } catch (error) {
            setError(error.response?.data?.message || "Error to create publication");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-secondary p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Nueva Publicación</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                        placeholder="What do you think?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full resize-none h-60"
                    />
                    <input
                        type="url"
                        placeholder="img url (optional)"
                        value={imgSrc}
                        onChange={(e) => setImgSrc(e.target.value)}
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Tags #tag1 #tag2 (optional)"
                        value={tags}
                        pattern="^#\w+(\s+#\w+)*$"
                        onChange={(e) => setTags(e.target.value)}
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full"
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
                            {loading ? "Submitimg..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PublicationForm;