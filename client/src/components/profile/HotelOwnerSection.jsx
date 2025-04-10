import { useState } from "react";
import { motion } from 'framer-motion';
import { Info, Trash2 } from "lucide-react";

export default function HotelOwnerSection() {
  const [hotels, setHotels] = useState([
    { id: 1, name: "Grand Resort", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/370564672.jpg?k=4f37af06c05a6f5dfc7db5e8e71d2eb66cae6eec36af7a4a4cd7a25d65ceb941&o=&hp=1", location: "Malibu" },
    { id: 2, name: "Beach Paradise", image: "https://3.imimg.com/data3/JV/KJ/MY-15827078/hotels-booking.jpg", location: "Hawaii" },
    { id: 3, name: "Mountain Retreat", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKN4wL0OVMx2QzZtO1-rrZO-Sn1o8-pK7H6A&s", location: "Colorado" },
  ]);

  const deleteHotel = (id) => {
    setHotels(hotels.filter((hotel) => hotel.id !== id));
  };

  const showHotelDetails = (hotel) => {
    alert(`Hotel: ${hotel.name}\nLocation: ${hotel.location}`);
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
              key={hotel.id}
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
              <img src={hotel.image} alt={hotel.name} className="w-full h-56 object-cover rounded-lg mb-4" />
              <div className="w-full text-center">
                <h3 className="font-semibold text-xl text-gray-800">{hotel.name}</h3>
                <p className="text-gray-500">{hotel.location}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => showHotelDetails(hotel)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 bg-white border border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Info size={18} /> Details
                </button>
                <button
                  onClick={() => deleteHotel(hotel.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-white border border-red-500 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}



