export default function HotelSearch() {
 

    return (
        <>
            <div className="relative -top-16 max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    <input 
                        type="text" 
                        name="country" 
                        placeholder="Enter Country" 
                        className="p-3 border rounded-lg" 
                    />
                    <input type="text" name="city" placeholder="Enter place" className="p-3 border rounded-lg" />
                    <input type="date" name="checkin" className="p-3 border rounded-lg" />
                    <input type="date" name="checkout" className="p-3 border rounded-lg" />
                    <input type="number" name="guests" min="1" placeholder="Guests" className="p-3 border rounded-lg" />
                    <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">Search</button>
                </form>
            </div>
        </>
    );
}
