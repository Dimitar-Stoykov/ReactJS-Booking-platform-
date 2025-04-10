import { useEffect, useState } from "react"
import { useBookings } from "../API/bookAPI";
import { useUserContext } from "../contexts/UserContext";

export const useBookingsCount = () => { 
    const { _id: userId } = useUserContext();
    const [bookings, setBookings] = useState([]);
    const { getBookings } = useBookings();


    useEffect(() => { 
        const fetchBookings = async () => {

        try {
            const response = await getBookings(userId);
            const responseData = await response;
            
            setBookings(responseData)
            
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };
        
        fetchBookings();
    }, [userId]);

    return {
        bookings,
        setBookings,

    }
}
