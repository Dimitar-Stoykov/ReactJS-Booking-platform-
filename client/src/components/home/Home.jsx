export default function Home() {
    
    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80')" }}
        >
           
            <div className="absolute inset-0 bg-opacity-50"></div>

            
            <div className="relative z-10 text-center animate-fade-in-down">
                <h1 className="text-5xl font-bold text-white mb-4">Welcome to BookEase</h1>
                <p className="text-3xl font-bold text-white mb-4">Book your emotion</p>
            </div>


            
            <section className="relative z-10 mt-16 text-center animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-8">Featured Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/21/17/06/studio-with-eiffel-tower.jpg?w=1200&h=-1&s=1"
                            alt="Destination 1"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-white">Paris</h3>
                        <p className="text-blue-700">The city of love and lights.</p>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRr6R28d3Agq2qCQH8cebDr06iKvWUBMi5g&s"
                            alt="Destination 2"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-l  font-semibold text-white">Tokyo</h3>
                        <p className="text-blue-700">Experience the future today.</p>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src="https://www.fivestaralliance.com/files/fivestaralliance.com/term-images/503/peninsula-paris-2.jpeg"
                            alt="Destination 3"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-white">New York</h3>
                        <p className="text-blue-700">The city that never sleeps.</p>
                    </div>
                </div>
            </section>

        </div>
    );


}
