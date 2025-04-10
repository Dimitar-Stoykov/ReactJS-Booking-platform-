import { useState } from "react";
import { Camera } from "lucide-react";
import { useCreateHotel } from "../../../API/hotelsAPI";

export default function HotelCreate() {
    const {createHotel} = useCreateHotel(); 
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const [form, setForm] = useState({
        hotelName: "",
        generalPhoto: "",
        description: "",
        title: "",
        amenities: [], // Change to array
        roomDetails: "",
        address: "",
        country: "",
        city: "",
        photos: [],
        currentPhotoUrl: "",
        maxGuests: "",
        price: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "amenities") {
            // Split comma-separated values into an array
            setForm({ ...form, amenities: value.split(",").map(item => item.trim()) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleAddPhotoUrl = () => {
        if (form.currentPhotoUrl && !form.photos.includes(form.currentPhotoUrl)) {
            setForm({
                ...form,
                photos: [...form.photos, form.currentPhotoUrl],
                currentPhotoUrl: "",
            });
        }
    };

    const handleRemovePhoto = (index) => {
        setForm({ ...form, photos: form.photos.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try { 
            const response = await createHotel(form);
            setNotificationMessage(`Successfully created hotel: ${form.hotelName}`);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
            setForm({
                hotelName: "",
                generalPhoto: "",
                description: "",
                title: "",
                amenities: [],
                roomDetails: "",
                address: "",
                country: "",
                city: "",
                photos: [],
                currentPhotoUrl: "",
                maxGuests: "",
                price: "",
            });
            setIsSubmitting(false);
        } catch (error) { 
            console.error(error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-500 flex items-center justify-center p-6">
            <div className="relative w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl z-10 border border-gray-300 m-20">
                <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-8 text-center">Create Hotel</h2>
                <form onSubmit={handleSubmit} className="space-y-6 ">

                    <div className="flex flex-col items-center">
                        <label className="block text-gray-700 font-medium mb-2">General Photo</label>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 flex justify-center items-center relative">
                            {form.generalPhoto ? (
                                <img src={form.generalPhoto} alt="General" className="w-full h-full object-cover" />
                            ) : (
                                <Camera className="text-gray-400 w-10 h-10" />
                            )}
                        </div>
                        <input
                            type="text"
                            name="generalPhoto"
                            value={form.generalPhoto}
                            onChange={handleInputChange}
                            placeholder="Enter General Photo URL"
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Add Photo URLs</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                value={form.currentPhotoUrl}
                                onChange={(e) => setForm({ ...form, currentPhotoUrl: e.target.value })}
                                placeholder="Enter Image URL"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddPhotoUrl}
                                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-300"
                            >
                                Add URL
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {form.photos.map((photo, index) => (
                                <div key={index} className="relative w-32 h-32 overflow-hidden rounded-lg border-2 border-gray-300">
                                    <img
                                        src={photo}
                                        alt={`Hotel ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePhoto(index)}
                                        className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full p-1 hover:bg-red-700"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Hotel Name</label>
                        <input
                            type="text"
                            name="hotelName"
                            value={form.hotelName}
                            onChange={handleInputChange}
                            placeholder="Enter Hotel Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            placeholder="Enter Hotel Description"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Client Title</label>
                        <textarea
                            name="title"
                            value={form.title}
                            onChange={handleInputChange}
                            placeholder="Enter Hotel Client Title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Amenities (comma-separated)</label>
                        <input
                            type="text"
                            name="amenities"
                            value={form.amenities.join(", ")} // Join array to display as a comma-separated string
                            onChange={handleInputChange}
                            placeholder="e.g. Pool, WiFi, Breakfast"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price per Night ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleInputChange}
                            placeholder="Enter price per night"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Room Details</label>
                        <textarea
                            name="roomDetails"
                            value={form.roomDetails}
                            onChange={handleInputChange}
                            placeholder="Enter Room Details (e.g., King bed, Sea view)"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={handleInputChange}
                            placeholder="Enter Country"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleInputChange}
                            placeholder="Enter Hotel Address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">City</label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleInputChange}
                            placeholder="Enter City"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Max Guests</label>
                        <input
                            type="number"
                            name="maxGuests"
                            value={form.maxGuests}
                            onChange={handleInputChange}
                            placeholder="Enter maximum number of guests"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`bg-yellow-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-yellow-700 transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Hotel"}
                        </button>
                    </div>
                </form>
            </div>
            {showNotification && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-xl shadow-xl transform transition-all duration-300 ease-in-out z-50 opacity-90 hover:opacity-100">
                    <p className="font-semibold">{notificationMessage}</p>
                </div>
            )}
        </div>
    );
}
