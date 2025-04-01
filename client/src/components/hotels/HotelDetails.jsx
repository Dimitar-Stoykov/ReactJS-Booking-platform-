import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHotel } from '../../API/hotelsAPI';
import Spinner from '../Spinner';

export default function HotelDetails() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { hotelId } = useParams();
    const currentHotel = useHotel(hotelId);
    
    if (!currentHotel) { 
        return <Spinner /> 
    }

    const hotelImages = currentHotel.photos;

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotelImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? hotelImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Hotel Header Section */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800">{currentHotel.hotelName}</h1>
                    <p className="text-gray-600 mt-2">{currentHotel.address} {currentHotel.city}</p>

                </div>

                {/* Hotel Photos Section with Pagination */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Room Photos</h2>
                    <div className="relative h-96 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                        {/* Current Image */}
                        <img
                            src={hotelImages[currentImageIndex]}
                            alt={`Room ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain rounded-lg"
                        />

                        {/* Previous Button */}
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition text-2xl"
                        >
                            &lt;
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full shadow-lg hover:bg-black/90 transition text-2xl"
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                {/* Hotel Description Section */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
                    <p className="text-gray-600">
                        {currentHotel.description}
                    </p>
                </div>

                {/* Amenities Section */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentHotel.amenities.map(amenity => (
                            <div key={amenity} className="flex items-center">
                            <span className="text-blue-500 mr-2">✔</span>
                            <span className="text-gray-600">{amenity}</span>
                        </div>))}
                        
                    </div>
                </div>

                {/* Room Details Section */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Room Details</h2>
                    <div className="space-y-6">
                        {/* Room 1 */}
                        <div className="border rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800">Deluxe Suite</h3>
                            <p className="text-gray-600 mt-2">
                                Spacious and elegantly designed, our Deluxe Suite offers a king-sized bed, a
                                private balcony, and a luxurious bathroom with a Jacuzzi.
                            </p>
                            <div className="mt-4 flex items-center">
                                <span className="text-gray-600">Price:</span>
                                <span className="ml-2 text-gray-800 font-bold">$300/night</span>
                            </div>
                        </div>

                        {/* Room 2 */}
                        <div className="border rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800">Executive Room</h3>
                            <p className="text-gray-600 mt-2">
                                Perfect for business travelers, the Executive Room features a work desk,
                                high-speed Wi-Fi, and access to the executive lounge.
                            </p>
                            <div className="mt-4 flex items-center">
                                <span className="text-gray-600">Price:</span>
                                <span className="ml-2 text-gray-800 font-bold">$250/night</span>
                            </div>
                        </div>

                        {/* Room 3 */}
                        <div className="border rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800">Family Room</h3>
                            <p className="text-gray-600 mt-2">
                                Ideal for families, this room includes two double beds, a sofa, and a
                                kid-friendly entertainment system.
                            </p>
                            <div className="mt-4 flex items-center">
                                <span className="text-gray-600">Price:</span>
                                <span className="ml-2 text-gray-800 font-bold">$200/night</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
