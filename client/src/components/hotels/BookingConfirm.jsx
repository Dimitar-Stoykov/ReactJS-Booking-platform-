import React from 'react';
import { CalendarDays, X } from 'lucide-react';

export default function BookingConfirmation({ hotelName, checkIn, checkOut, total, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-3xl w-full max-w-lg p-10 relative border-2 border-blue-300">
                
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-6">Confirm Your Booking</h2>
                    <p className="text-gray-600 mb-8">Please review your booking details and confirm your reservation.</p>
                </div>

                <div className="space-y-5 text-gray-700 text-lg">
                   
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <CalendarDays className="text-blue-500" size={22} />
                            <span>Hotel:</span>
                        </div>
                        <span className="font-semibold">{hotelName}</span>
                    </div>

                
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <CalendarDays className="text-green-500" size={22} />
                            <span>Check-in:</span>
                        </div>
                        <span className="font-semibold">{checkIn}</span>
                    </div>

              
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <CalendarDays className="text-red-500" size={22} />
                            <span>Check-out:</span>
                        </div>
                        <span className="font-semibold">{checkOut}</span>
                    </div>

           
                    <div className="flex justify-between items-center">
                        <span>Total Price:</span>
                        <span className="text-2xl font-bold text-blue-600">${total}</span>
                    </div>
                </div>

                <div className="mt-10 flex justify-end space-x-6">
              
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-lg text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-300 transform hover:scale-105"
                    >
                        Cancel
                    </button>
            
                    <button
                        onClick={onConfirm}
                        className="px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 rounded-2xl transition-all duration-300 transform hover:scale-105"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
