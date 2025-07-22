import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useOwnHotels } from "../API/hotelsAPI";

export const useOwnHotelsList = () => { 
    const { _id: userId } = useUserContext();
    const [onwHotels, setOwnHotels] = useState([]);
    const { getHotels } = useOwnHotels();


    useEffect(() => { 
        const fetchHotels = async () => {

        try {
            const response = await getHotels(userId);
            const responseData = await response;
            
            setOwnHotels(responseData)
            
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };
        
        fetchHotels();
    }, [userId]);
    return {
        ownHotels: onwHotels,
        setOwnHotels,

    }
}
