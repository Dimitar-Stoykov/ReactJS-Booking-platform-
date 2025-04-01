import {HotelContext} from "../contexts/HotelContext"
import { useHotels } from "../API/hotelsAPI";

export const HotelProvider = ({ children }) => { 
    const { hotels, setHotels } = useHotels();
    
    const addHotel = (newHotel) => { 
        setHotels(prevState => [...prevState, newHotel]);

    }
    
    return (
        <HotelContext.Provider value={{ hotels, addHotel }}>
            {children}
        </HotelContext.Provider>
    );
};
