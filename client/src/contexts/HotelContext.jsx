import { createContext, useContext } from "react";

export const HotelContext = createContext({
    
});


export const useHotelsContext = () => useContext(HotelContext);


