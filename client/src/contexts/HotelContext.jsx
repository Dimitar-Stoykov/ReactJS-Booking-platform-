import { createContext, useContext } from "react";

export const HotelContext = createContext({
    hotelName: "",
    generalPhoto: "",
    description: "",
    title: "",
    amenities: [],
    roomDetails: "",
    address: "",
    country: "",
    city: "",
    photos: [],
    currentPhotoUrl: "",
    maxGuests: "",
    price: "",
    addHotel: () => null,
});


export const useHotelsContext = () => useContext(HotelContext);


