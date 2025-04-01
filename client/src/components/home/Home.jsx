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



            <section className="relative z-10 mt-16 text-center animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-8">Featured Destinations</h2>
                    {latestHotels.length > 0 ? (latestHotels.map((hotel) => (
                        <div key={hotel._id} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <img
                                src={hotel.generalPhoto}
                                alt="Destination 1"
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold text-blue-700 mb-5">City: {hotel.city}</h3>
                            <p className="text-blue-700">{hotel.title}</p>
                        </div>
                        </div> 
                    ))) : (  
                        <h1 className="text-5xl font-bold text-white">No added hotels</h1>
                        
                    )}


            </section>

        </div>
    );


}
