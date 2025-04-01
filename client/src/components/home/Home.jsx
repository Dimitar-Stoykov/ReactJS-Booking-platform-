import { useTreeHotels } from "../../API/hotelsAPI";

export default function Home() {
    const [latestHotels] = useTreeHotels();

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80')" }}
        >
            <div className="absolute inset-0 bg-opacity-50"></div>

            <div className="relative z-10 text-center animate-fade-in-down">
                <h1 className="text-5xl font-bold text-white mb-4">Welcome to BookEase</h1>
            </div>

            <section className="relative z-10 mt-16 text-center animate-fade-in w-full px-4">
                <h2 className="text-4xl font-bold text-white mb-8">Latest Destinations</h2>

                {latestHotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                        {latestHotels.map((hotel) => (
                            <div
                                key={hotel._id}
                                className="bg-gradient-to-t from-black/50 via-black/50 to-transparent p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30"
                            >
                                {/* Image Container */}
                                <div className="relative">
                                    <img
                                        src={hotel.generalPhoto}
                                        alt={hotel.city}
                                        className="w-full h-56 object-cover rounded-xl"
                                    />
                                    <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 text-sm rounded-full shadow-md">
                                        {hotel.city}
                                    </div>
                                </div>

                                {/* Hotel Info */}
                                <div className="mt-4 text-center">
                                    <h3 className="text-2xl font-semibold text-white">{hotel.hotelName}</h3>
                                    <p className="text-lg text-white/80 mt-2">{hotel.title}</p>
                                    <span className="block mt-3 text-indigo-200 font-bold">${hotel.price} / night</span>
                                </div>

                                {/* Book Now Button */}
                                <button className="mt-5 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 className="text-5xl font-bold text-white">No added hotels</h1>
                )}
            </section>

        </div>
    );
}
