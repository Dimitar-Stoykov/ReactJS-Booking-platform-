import { formatDate } from "../../utils/hotelUtils";


export default function HotelSearch({
    onSearch,
    formAction,
}) {
    const today = formatDate(new Date());
    const { formData, setFormData } = formAction;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckOutDate = (e) => {
        const checkOutValue = e.target.value;
        const checkInValue = formData.checkIn;

        if (checkOutValue && checkInValue && new Date(checkOutValue) < new Date(checkInValue)) {
            alert("Check-out date cannot be earlier than check-in date!");
            e.target.value = ""; 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const entries = Object.entries(formData);
        const whereConditions = entries.reduce((acc, [key, value]) => {
            if (!value) return acc;

            
            if (key === "checkIn" || key === "checkOut") {
                return acc; 
            }

            const isString = isNaN(value);
            if (isString) {
                const currValue = value.trim();
                acc.push(`${key} LIKE "${currValue}"`);
            } else {
                acc.push(`${key} >= ${value}`);
            }

            return acc;
        }, []);

        if (whereConditions.length > 0) {

            const whereParam = whereConditions.join(" AND ");
            onSearch(whereParam);

        } else {
            onSearch(""); 
        }
    };

    return (
        <>
            <div className="relative -top-16 max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    <input
                        type="text"
                        name="country"
                        placeholder="Enter Country"
                        className="p-3 border rounded-lg"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter place"
                        className="p-3 border rounded-lg"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="checkIn"
                        className="p-3 border rounded-lg"
                        value={formData.checkIn}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="checkOut"
                        className="p-3 border rounded-lg"
                        value={formData.checkOut}
                        onChange={(e) => {
                            handleChange(e);
                            handleCheckOutDate(e);
                        }}
                        min={formData.checkIn || ""}
                    />
                    <input
                        type="number"
                        name="maxGuests"
                        min="1"
                        placeholder="Guests"
                        className="p-3 border rounded-lg"
                        value={formData.maxGuests}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Search
                    </button>
                </form>
            </div>
        </>
    );
}
