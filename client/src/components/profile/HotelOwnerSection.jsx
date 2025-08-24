import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Trash2, X } from "lucide-react";
import { useOwnHotelsList } from "../../hooks/useOwnHotels";
import { useDeleteHotel } from "../../API/hotelsAPI";
import { Navigate, useNavigate } from "react-router";


export default function HotelOwnerSection() {
    const navigate = useNavigate();
    const { ownHotels: hotels, setOwnHotels: setHotels } = useOwnHotelsList();
    const { deleteHotel: deleteOwnHotel } = useDeleteHotel();

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");


    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetHotel, setTargetHotel] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openConfirm = (hotel) => {
        setTargetHotel(hotel);
        setConfirmOpen(true);
    };

    const closeConfirm = () => {
        if (isDeleting) return;
        setConfirmOpen(false);
        setTargetHotel(null);
    };

    const actuallyDeleteHotel = async () => {
        if (!targetHotel) return;
        setIsDeleting(true);
        try {
            await deleteOwnHotel(targetHotel._id);
            setHotels(hotels.filter((h) => h._id !== targetHotel._id));

            setNotificationMessage("Hotel deleted successfully ✅");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (err) {
            console.error(err);
            setNotificationMessage("Failed to delete hotel ❌");
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } finally {
            setIsDeleting(false);
            setConfirmOpen(false);
            setTargetHotel(null);
        }
    };

    const showHotelDetails = (hotel) => {
        navigate(`/hotels/${hotel._id}/details`)
    };


    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape" && confirmOpen && !isDeleting) closeConfirm();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [confirmOpen, isDeleting]);

    return (
        <div className="relative bg-white p-8 rounded-3xl shadow-lg w-full max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Hotels</h2>

            <div className="space-y-6">
                {hotels.length === 0 ? (
                    <p className="text-gray-500 text-center">No hotels found.</p>
                ) : (
                    hotels.map((hotel) => (
                        <motion.div
                            key={hotel._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all w-full mx-auto p-6 flex flex-col items-center"
                        >
                            <img
                                src={hotel.generalPhoto}
                                alt={hotel.hotelName}
                                className="w-full h-56 object-cover rounded-lg mb-4"
                            />
                            <div className="w-full text-center">
                                <h3 className="font-semibold text-xl text-gray-800">{hotel.hotelName}</h3>
                                <p className="text-gray-500">
                                    {hotel.country} {hotel.city} {hotel.address}
                                </p>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => showHotelDetails(hotel)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 bg-white border border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <Info size={18} /> Details
                                </button>
                                <button
                                    onClick={() => openConfirm(hotel)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-white border border-red-500 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <Trash2 size={18} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>


            {showNotification && (
                <div className="fixed right-6 bottom-20 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl z-50 opacity-90 hover:opacity-100 transition-all duration-300">
                    <p className="font-semibold">{notificationMessage}</p>
                </div>
            )}


            <ConfirmDialog
                open={confirmOpen}
                title="Delete hotel"
                message={
                    targetHotel
                        ? `Are you sure you want to delete “${targetHotel.hotelName}”? This action cannot be undone.`
                        : ""
                }
                confirmText={isDeleting ? "Deleting..." : "Delete"}
                cancelText="Cancel"
                onConfirm={actuallyDeleteHotel}
                onCancel={closeConfirm}
                loading={isDeleting}
            />
        </div>
    );
}

function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
}) {
    return (
        <AnimatePresence>
            {open && (
                <>

                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                    />

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="confirm-title"
                    >
                        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200">
                            <div className="flex items-center justify-between px-5 py-4 border-b">
                                <h3 id="confirm-title" className="text-lg font-semibold text-gray-900">
                                    {title}
                                </h3>
                                <button
                                    onClick={onCancel}
                                    className="p-2 rounded hover:bg-gray-100"
                                    aria-label="Close"
                                    disabled={loading}
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="px-5 py-4">
                                <p className="text-gray-700">{message}</p>
                            </div>

                            <div className="flex justify-end gap-3 px-5 py-4 border-t">
                                <button
                                    onClick={onCancel}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    disabled={loading}
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className={`px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 disabled:opacity-60`}
                                    disabled={loading}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
