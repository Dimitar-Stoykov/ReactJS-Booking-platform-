import { useEffect, useState } from "react";
import request from "../utils/request";


const baseUrl = "http://localhost:3030/data/hotels";

export const useHotels = () => { 
    return request.get(baseUrl);
      
};

export const useHotel = (hotelId) => { 
    const [hotel, setHotel] = useState();

    useEffect(() => {
        (async () => { 
            const result = await request.get(`${baseUrl}/${hotelId}`);
            setHotel(result)

        })();
    

    }, [hotelId])

    return  hotel ;
}



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
