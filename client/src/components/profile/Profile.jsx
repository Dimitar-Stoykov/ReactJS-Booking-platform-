import { useState } from "react";
import { User, CalendarCheck, Trash2, Info, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">My Account</h2>
        <nav className="space-y-4">
          {[ 
            { name: "Profile", icon: <User size={20} />, tab: "profile" },
            { name: "Bookings", icon: <CalendarCheck size={20} />, tab: "bookings" },
            { name: "Own Hotels", icon: <BarChart2 size={20} />, tab: "ownHotels" },
          ].map(({ name, icon, tab }) => (
            <button
              key={tab}
              className={`flex items-center gap-3 p-3 w-full rounded-lg text-gray-700 hover:bg-purple-100 transition ${
                activeTab === tab ? "bg-purple-500 text-white" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {icon}
              {name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "bookings" && <BookingsSection />}
        {activeTab === "ownHotels" && <OwnHotelsSection />}
      </main>
    </div>
  );
}

function ProfileSection() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Profile</h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-purple-300"
        />
        <button className="text-sm text-purple-500 hover:underline">Change Photo</button>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: "Full Name", name: "name" },
          { label: "Email Address", name: "email" },
          { label: "Phone Number", name: "phone" },
        ].map(({ label, name }) => (
          <div key={name} className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function BookingsSection() {
  const [bookings, setBookings] = useState([
    { id: 1, hotel: "Grand Resort", date: "2025-04-10", status: "Confirmed" },
    { id: 2, hotel: "City Inn", date: "2025-05-15", status: "Pending" },
    { id: 3, hotel: "Beach Paradise", date: "2025-06-20", status: "Cancelled" },
    { id: 4, hotel: "Beach Paradise", date: "2025-06-20", status: "Cancelled" },
  ]);

  const cancelBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const showDetails = (booking) => {
    alert(`Hotel: ${booking.hotel}\nDate: ${booking.date}\nStatus: ${booking.status}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-4xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Bookings</h2>

      <div className="space-y-6">
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
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
                <h3 className="font-semibold text-xl text-gray-800">{booking.hotel}</h3>
                <p className="text-gray-500">📅 {booking.date}</p>
                <p className={`font-medium ${booking.status === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
                  {booking.status}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => showDetails(booking)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 bg-white border border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Info size={18} /> Details
                </button>

                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-white border border-red-500 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Trash2 size={18} /> Cancel
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// 📌 Own Hotels Section
function OwnHotelsSection() {
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

