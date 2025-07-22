import { useState } from "react";
import { motion } from 'framer-motion';
import { Info, Trash2 } from "lucide-react";
import { useOwnHotelsList } from "../../hooks/useOwnHotels";
import { useDeleteHotel } from "../../API/hotelsAPI";



export default function HotelOwnerSection() {
  const {ownHotels: hotels, setOwnHotels: setHotels} = useOwnHotelsList();
  const { deleteHotel: deleteOwnHotel }  = useDeleteHotel();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const deleteHotel = (id) => {
    try {
      deleteOwnHotel(id) 
      setHotels(hotels.filter((hotel) => hotel._id !== id));
      setNotificationMessage("Hotel deleted successfully ✅");
      setShowNotification(true);

      setTimeout(() => {
          setShowNotification(false);
      }, 3000);
    } catch (error) { 
      console.error(error)
    }

  };

  const showHotelDetails = (hotel) => {
    alert(`Hotel: ${hotel.hotelName}\nLocation: ${hotel.country} ${hotel.city}`);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-4xl mx-auto border border-gray-200">
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
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all w-full mx-auto p-6 flex flex-col items-center"
            >
              <img src={hotel.generalPhoto} alt={hotel.hotelName} className="w-full h-56 object-cover rounded-lg mb-4" />
              <div className="w-full text-center">
                <h3 className="font-semibold text-xl text-gray-800">{hotel.hotelName}</h3>
                <p className="text-gray-500">{hotel.country} {hotel.city} {hotel.address}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => showHotelDetails(hotel)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 bg-white border border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Info size={18} /> Details
                </button>
                <button
                  onClick={() => deleteHotel(hotel._id)}
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
    </div>
  );
}



