export default function HotelListItem() {
  



    return (
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((hotel, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 w-full max-w-xs mx-auto">
            <img
              src={`https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=`}
              alt="Hotel"
              className="w-full h-56 object-cover rounded-t-3xl"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Luxury Hotel {index + 1}</h2>
              <p className="text-md text-gray-600 mb-3">New York, USA</p>
              <p className="text-gray-700 text-sm mb-3">
                Enjoy a premium stay with breathtaking views and world-class amenities.
              </p>
              <div className="flex items-center space-x-2 text-yellow-500 mb-3">
                ⭐⭐⭐⭐⭐
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">$250/night</span>
                <button className="bg-indigo-600 text-white px-3 py-2 rounded-full hover:bg-indigo-700 transition duration-300">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}
