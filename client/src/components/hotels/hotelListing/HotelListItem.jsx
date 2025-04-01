import { useHotelsContext } from "../../../contexts/HotelContext";



export default function HotelListItem() {
        const { hotels } = useHotelsContext();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels?.length > 0 ? (hotels.map((hotel) => (
                <div key={hotel._id} className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 w-full max-w-xs mx-auto">
                    <img
                        src={hotel.generalPhoto}
                        alt="Hotel"
                        className="w-full h-56 object-cover rounded-t-3xl"
                    />
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-2"> {hotel.hotelName} </h2>
                        <p className="text-md text-gray-600 mb-3">
                            {[hotel.country, hotel.city, hotel.address].filter(Boolean).join(", ")}
                        </p>

                        <p className="text-gray-700 text-sm mb-3">
                            {hotel.title}
                        </p>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-indigo-600">${hotel.price}/night</span>
                            <button className="bg-indigo-600 text-white px-3 py-2 rounded-full hover:bg-indigo-700 transition duration-300">Book Now</button>
                        </div>
                    </div>
                </div>
            ))) : (
                <p className="col-span-full text-center text-4xl text-white">No hotels available at the moment.</p>
            )
        }
        </div>
    );
}
