import { useEffect, useState } from "react";
import request from "../utils/request";
import { BsPass } from "react-icons/bs";


const baseUrl = "http://localhost:3030/data/hotels";

export const useHotels = () => { 
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        
            request.get(baseUrl).then(setHotels);
      
    }, []);

    return {hotels, setHotels};
};

export const useTreeHotels = () => {
    const [latestTreeHotels, setLatestTreeHotels] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: 3,
            select: '_id,generalPhoto,title,hotelName,city,price',
        });

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setLatestTreeHotels)
    }, []);

    return [latestTreeHotels];
}


export const useCreateHotel = (hotelData) => { 
    return
    
} 
