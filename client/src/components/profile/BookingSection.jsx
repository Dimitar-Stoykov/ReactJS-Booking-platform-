import { useState } from "react";
import { motion } from 'framer-motion';
import { ClockFading, Trash2 } from "lucide-react";
import { useBookingsCount } from "../../hooks/useBookingsCount";
import { useDeleteBookings } from "../../API/bookAPI";

export default function BookingsSection() {
    const { bookings, setBookings } = useBookingsCount();
    const { deleteBooking } = useDeleteBookings();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");


    const cancelBooking = (id) => {
        setBookings(bookings.filter((booking) => booking._id !== id));
        deleteBooking(id);

        setNotificationMessage("Booking deleted successfully ✅");
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };


    
    const getBookingStatus = (checkOutDate) => {
        const today = new Date();
        const checkOut = new Date(checkOutDate);

        if (checkOut < today) {
            return "Expired"; 
        } else {
            return "Available"; 
        }
    };

    return (
        <>
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Bookings</h2>

            <div className="space-y-6">
                {bookings.length === 0 ? (
                    <p className="text-gray-500 text-center">No bookings found.</p>
                ) : (
                    bookings.map((booking) => (
                        <motion.div
                            key={booking._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all w-full mx-auto p-6 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold text-xl text-gray-800">{booking.hotelName}</h3>
                                <p className="text-gray-500">📅 Check-in: {booking.checkIn}</p>
                                <p className="text-gray-500">📅 Check-out: {booking.checkOut}</p>
                                <p className="text-gray-500">Total Price: $ {booking.totalPrice}</p>

                                <p className={`font-medium ${getBookingStatus(booking.checkOut) === "Expired" ? "text-red-500" : "text-green-500"}`}>
                                    {getBookingStatus(booking.checkOut)}
                                </p>
                            </div>

                            <div className="flex gap-3">
                               
                                <button
                                    onClick={() => cancelBooking(booking._id)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-red-600 border border-red-500 hover:bg-red-700 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <Trash2 size={18} /> 
                                    {getBookingStatus(booking.checkOut) === "Expired" ? "Delete" : "Cancel"}
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}

            </div>
        </div>
        
        {showNotification && (
            <div className="fixed right-6 bottom-20 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl z-50 opacity-90 hover:opacity-100 transition-all duration-300">
                <p className="font-semibold">{notificationMessage}</p>
            </div>
        )}
        </>
    );
}
