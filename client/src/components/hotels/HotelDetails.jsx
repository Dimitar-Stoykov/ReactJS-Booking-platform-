import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useHotel } from '../../API/hotelsAPI';
import Spinner from '../Spinner';

import { calculateBookingInfo, formatDate } from '../../utils/hotelUtils';
import BookingConfirmation from './BookingConfirm';
import { useCreateBooking } from '../../API/bookAPI';

export default function HotelDetails() {
    const { hotelId } = useParams();
    const currentHotel = useHotel(hotelId);
    const navigate = useNavigate();
    const location = useLocation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    
    const { checkIn, checkOut } = location.state || {};
    const [localCheckIn, setLocalCheckIn] = useState(checkIn || '');
    const [localCheckOut, setLocalCheckOut] = useState(checkOut || '');
    
    const { create: createBooking } = useCreateBooking();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    if (!currentHotel) return <Spinner />;


    const {
        photos,
        hotelName,
        country,
        city,
        address,
        description,
        amenities,
        price,
        maxGuests = 2
    } = currentHotel;


    const today = formatDate(new Date());

    const bookingInfo = calculateBookingInfo(localCheckIn, localCheckOut, price);
    
    const handleCheckInChange = (e) => {
        const value = e.target.value;
        setLocalCheckIn(value);

        if (localCheckOut && new Date(localCheckOut) <= new Date(value)) {
            setLocalCheckOut('');
        }
    };

    const handleCheckOutChange = (e) => {
        const value = e.target.value;
        if (new Date(value) > new Date(localCheckIn)) {
            setLocalCheckOut(value);
        }
    };

    const handleBookNow = () => {
        if (!localCheckIn || !localCheckOut) {
            return;
        }

        setShowModal(true);
    };

    const confirmBookingHandler = async () => {

        const bookingData = {
            hotelName,
            checkIn: localCheckIn,
            checkOut: localCheckOut,
            totalPrice: bookingInfo.total
        }

       try {
            await createBooking(bookingData); 
            setShowModal(false);
            setNotificationMessage("Your booking is successful!");
            setShowNotification(true); 
            setLocalCheckIn('');
            setLocalCheckOut('');
            setTimeout(() => {
                setShowNotification(false); 
            }, 3000);
        } catch (error) {
            console.error("Booking failed:", error);
            setNotificationMessage("Booking failed. Please try again.");
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    };
    
    const cancelBooking = () => {
        setShowModal(false);
    };

    const changeImage = (step) => {
        setCurrentImageIndex((prev) => (prev + step + photos.length) % photos.length);
    };

    return (
        <>
        {showModal && (
            <BookingConfirmation
                hotelName={hotelName}
                checkIn={localCheckIn}
                checkOut={localCheckOut}
                total={bookingInfo.total}
                onClose={cancelBooking}
                onConfirm={confirmBookingHandler}
            />
        )}

        <div className="min-h-screen bg-gradient-to-r from-blue-200 via-white to-blue-100 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">


                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all">
                    <h1 className="text-3xl font-semibold text-blue-700">{hotelName}</h1>
                    <p className="text-gray-600 mt-2">{country}, {city}, {address}</p>
                    <p className="text-gray-500 text-sm mt-1">Maximum occupancy: {maxGuests} guests</p>
                </div>


                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Room Photos</h2>
                    <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img
                            src={photos[currentImageIndex]}
                            alt={`Room ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                        <button onClick={() => changeImage(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/70 p-3 rounded-full hover:bg-blue-600">&lt;</button>
                        <button onClick={() => changeImage(1)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/70 p-3 rounded-full hover:bg-blue-600">&gt;</button>
                    </div>
                </div>


                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Description</h2>
                    <p className="text-gray-600">{description}</p>
                </div>


                <div className="p-6 border-b-2 border-blue-300 hover:bg-blue-50 transition-all">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {amenities.map((item) => (
                            <div key={item} className="flex items-center">
                                <span className="text-blue-500 mr-2">✔</span>
                                <span className="text-gray-600">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="p-6 border-t-2 border-blue-300 hover:bg-blue-50 transition-all">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-6">Book Your Stay</h2>

                    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-blue-100 hover:shadow-2xl">
                        <div className="flex justify-between text-lg text-gray-700">
                            <span>Base Price</span>
                            <span className="text-xl font-semibold text-blue-600">${price}/night</span>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 mb-2 text-sm">Check-in</label>
                                <input
                                    type="date"
                                    value={localCheckIn}
                                    onChange={handleCheckInChange}
                                    min={today}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 text-sm">Check-out</label>
                                <input
                                    type="date"
                                    value={localCheckOut}
                                    onChange={handleCheckOutChange}
                                    min={localCheckIn || today + 1}
                                    disabled={!localCheckIn}
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {bookingInfo ? (
                            <>
                                <div className="space-y-2 text-sm text-gray-600">
                                    {[
                                        ['Check-in', localCheckIn],
                                        ['Check-out', localCheckOut],
                                        ['Duration', `${bookingInfo.days} nights`],
                                        ['Max Guests', maxGuests]
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex justify-between">
                                            <span>{label}:</span>
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    ))}
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

                         {showNotification && (
                            <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-xl shadow-xl transform transition-all duration-300 ease-in-out z-50 opacity-90 hover:opacity-100">
                                <p className="font-semibold">{notificationMessage}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        
        </>
    );
}
