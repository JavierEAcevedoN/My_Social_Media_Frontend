import { useContext, useState } from "react";
import api from "../api"; 
import AuthContext from "../context/AuthContext";

const EditProfileForm = ({
    profilePhoto,
    fullName,
    biography,
    phone,
    onClose
}) => {
    const [newProfilePhoto, setNewProfilePhoto] = useState(profilePhoto);
    const [newFullName, setNewFullName] = useState(fullName);
    const [newBiography, setNewBiography] = useState(biography);
    const [newPhone, setNewPhone] = useState(phone);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const updatedData = {
            profilePhoto: newProfilePhoto,
            fullName: newFullName,
            biography: newBiography,
            phone: newPhone,
        };

        try {
            await api.patch(`/users/${user}`, updatedData);
            onClose();
            window.location.reload()
        } catch (error) {
            setError(error.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-primary bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-secondary p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
                {error && <p className="text-red-500 text-sm text-center mb-1">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Profile Photo URL"
                        value={newProfilePhoto}
                        onChange={(e) => setNewProfilePhoto(e.target.value)}
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        required
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full"
                    />
                    <textarea
                        placeholder="Biography"
                        value={newBiography}
                        onChange={(e) => setNewBiography(e.target.value)}
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full resize-none h-40"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="outline outline-input transition-shadow focus:invalid:outline-input-invalid focus:invalid:shadow-input-invalid focus:outline-input-focus focus:shadow-input-auth focus:shadow-input-shadow bg-third text-primary-text rounded-lg p-2 w-full"
                        pattern="^\+[0-9]{1,4} [0-9]{3} [0-9]{3} [0-9]{4}$"
                        title="+12 345 678 9101"
                    />
                    
                    <div className="flex justify-between">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="bg-third outline outline-input transition-colors text-primary-text px-4 py-2 rounded-lg hover:bg-primary cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-third outline outline-input transition-colors text-primary-text px-4 py-2 rounded-lg hover:bg-five cursor-pointer"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;