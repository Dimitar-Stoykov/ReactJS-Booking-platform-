import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";


const baseUrl = "http://localhost:3030/data/hotels";

export const useHotels = async (skip, pageSize, searchParams = {}) => {
    try {
       
        const params = new URLSearchParams({
            offset: skip,
            pageSize: pageSize,
        });

        if (searchParams) {
            params.append('where', searchParams);
        }

        const response = await fetch(`${baseUrl}?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch hotels");
        }
        
        const data = await response.json(); 

        return data;
    } catch (error) {
        console.error("Error fetching hotels:", error);
        throw error; 
    }
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


export const useCreateHotel = () => { 
    const { request } = useAuth();

    const createHotel = async (hotelData) => { 
       const result = await request.post(baseUrl, hotelData);
       return result;
    }

    return { 
        createHotel,
    }
} 
