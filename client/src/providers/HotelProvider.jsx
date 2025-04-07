import {HotelContext} from "../contexts/HotelContext"
import { useHotels } from "../API/hotelsAPI";
import { useEffect, useState } from "react";

export const HotelProvider = ({ children }) => { 
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        useHotels().then(setHotels);
    
    }, []);

    
    
    const addHotel = (newHotel) => { 
        setHotels(prevState => [...prevState, newHotel]);

    }
    
    return (
        <HotelContext.Provider value={{ hotels, addHotel }}>
            {children}
        </HotelContext.Provider>
    );
};
