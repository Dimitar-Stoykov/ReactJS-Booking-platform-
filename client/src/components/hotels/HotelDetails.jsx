import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useHotel } from '../../API/hotelsAPI';
import Spinner from '../Spinner';

export default function HotelDetails() {
    const location = useLocation();
    const { checkIn, checkOut } = location.state || {};
   
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [localCheckIn, setLocalCheckIn] = useState(checkIn);
    const [localCheckOut, setLocalCheckOut] = useState(checkOut);
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const currentHotel = useHotel(hotelId);

    if (!currentHotel) {
        return <Spinner />;
    }

    const hotelImages = currentHotel.photos;
    const basePrice = currentHotel.price;
    const maxGuests = currentHotel.maxGuests || 2;

    const checkInDate = localCheckIn;
    const checkOutDate = localCheckOut;

    const calculateTotal = () => {
        if (!checkInDate || !checkOutDate) return null;

        const oneDay = 24 * 60 * 60 * 1000;
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));

        return {
            days: diffDays,
            total: diffDays * basePrice
        };
    };

    const bookingInfo = calculateTotal();

    const handleBookNow = () => {
        if (!checkInDate || !checkOutDate) {
            // Update URL with selected dates if they weren't provided initially
            navigate(`?checkIn=${localCheckIn}&checkOut=${localCheckOut}`);
        }
        alert(`Booking confirmed for ${currentHotel.hotelName} from ${checkInDate} to ${checkOutDate}`);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotelImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? hotelImages.length - 1 : prevIndex - 1
        );
    };

    const handleCheckInChange = (e) => {
        const newCheckInDate = e.target.value;
        setLocalCheckIn(newCheckInDate);

        if (localCheckOut && new Date(localCheckOut) < new Date(newCheckInDate)) {
            setLocalCheckOut('');
        }
    };

    const handleCheckOutChange = (e) => {
        const newCheckOutDate = e.target.value;
        if (new Date(newCheckOutDate) >= new Date(localCheckIn)) {
            setLocalCheckOut(newCheckOutDate);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-blue-100 shadow-2xl backdrop-blur-sm border border-blue-300/40 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all ease-in-out duration-300">
                    <h1 className="text-3xl font-semibold text-blue-700">{currentHotel.hotelName}</h1>
                    <p className="text-gray-600 mt-2">{currentHotel.country}, {currentHotel.city}, {currentHotel.address}</p>
                    <p className="text-gray-500 text-sm mt-1">Maximum occupancy: {maxGuests} guests</p>
                </div>

                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all ease-in-out duration-300">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Room Photos</h2>
                    <div className="relative h-96 overflow-hidden rounded-2xl bg-gray-200 flex items-center justify-center transition-all">
                        <img
                            src={hotelImages[currentImageIndex]}
                            alt={`Room ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover rounded-2xl shadow-lg transition-all"
                        />
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition text-2xl"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition text-2xl"
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all ease-in-out duration-300">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Description</h2>
                    <p className="text-gray-600">
                        {currentHotel.description}
                    </p>
                </div>

                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all ease-in-out duration-300">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentHotel.amenities.map(amenity => (
                            <div key={amenity} className="flex items-center">
                                <span className="text-blue-500 mr-2">✔</span>
                                <span className="text-gray-600">{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>

             
                <div className="p-6 border-t-2 border-blue-300 hover:bg-blue-50 transition-all ease-in-out duration-300">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-6">Book Your Stay</h2>
                    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-blue-100 hover:shadow-2xl transition-all">
                        <div className="flex justify-between items-center">
                            <span className="text-lg text-gray-700">Base Price</span>
                            <span className="text-xl font-semibold text-blue-600">${basePrice}/night</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 mb-2 text-sm font-medium">Check-in</label>
                                <input
                                    type="date"
                                    value={localCheckIn}
                                    onChange={handleCheckInChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 text-sm font-medium">Check-out</label>
                                <input
                                    type="date"
                                    value={localCheckOut}
                                    onChange={handleCheckOutChange}
                                    min={localCheckIn || new Date().toISOString().split('T')[0]}
                                    disabled={!localCheckIn}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {bookingInfo ? (
                            <>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Check-in:</span>
                                        <span className="font-medium">{checkInDate}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Check-out:</span>
                                        <span className="font-medium">{checkOutDate}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Duration:</span>
                                        <span className="font-medium">{bookingInfo.days} nights</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Max Guests:</span>
                                        <span className="font-medium">{maxGuests}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t-2 border-blue-300">
                                    <span className="text-lg font-medium text-gray-800">Total Price</span>
                                    <span className="text-2xl font-bold text-blue-600">${bookingInfo.total}</span>
                                </div>

                                <button
                                    onClick={handleBookNow}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-xl"
                                >
                                    Confirm Booking
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-600 italic text-center">
                                Please select your check-in and check-out dates.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
