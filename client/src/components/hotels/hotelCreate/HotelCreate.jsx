import { useState } from "react";
import { Camera } from "lucide-react";
import { useCreateHotel } from "../../../API/hotelsAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function HotelCreateMultiStep() {
    const { createHotel } = useCreateHotel();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();


    const [form, setForm] = useState({
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "amenities") {
            setForm({ ...form, amenities: value.split(",").map((item) => item.trim()) });
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
            toast.success("✅ Photo added successfully!");
        } else {
            toast.error(form.currentPhotoUrl ? "⚠️ This image has already been added!" : "⚠️ You have to add photo!");
        }
    };

    const handleRemovePhoto = (index) => {
        setForm({ ...form, photos: form.photos.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        try {
            const response = await createHotel(form);
            if (response) {
                toast.success(`Successfully created hotel: ${form.hotelName}`);
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
                setStep(1);
                navigate("/destinations")
            } else {
                toast.error(`Cannot create hotel: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while creating hotel.");
        }
        setIsSubmitting(false);
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-500 flex items-center justify-center p-6">
            
            <div className="relative w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl z-10 border border-gray-300">
                <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-8 text-center">
                    Create Hotel
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        step === 3 ? handleSubmit() : nextStep();
                    }}
                    className="space-y-6"
                >

                    {step === 1 && (
                        <>
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

                            <div>
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
                                            <img src={photo} alt={`Hotel ${index + 1}`} className="w-full h-full object-cover" />
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
                        </>
                    )}

                    {/* Step 2: Amenities & Room Info */}
                    {step === 2 && (
                        <>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Amenities (comma-separated)</label>
                                <input
                                    type="text"
                                    name="amenities"
                                    value={form.amenities.join(", ")}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Pool, WiFi, Breakfast"
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
                        </>
                    )}

                    {/* Step 3: Location Info */}
                    {step === 3 && (
                        <>
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
                        </>
                    )}

                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-all duration-300"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            className={`bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={isSubmitting}
                        >
                            {step === 3 ? (isSubmitting ? "Creating..." : "Create Hotel") : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
