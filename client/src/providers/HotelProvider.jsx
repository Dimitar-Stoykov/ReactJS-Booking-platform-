import {HotelContext} from "../contexts/HotelContext"
import { useHotels } from "../API/hotelsAPI";

export const HotelProvider = ({ children }) => { 
    const { hotels, addHotel } = useHotels();
    
    
    return (
        <HotelContext.Provider value={{ hotels, addHotel }}>
            {children}
        </HotelContext.Provider>
    );
};
