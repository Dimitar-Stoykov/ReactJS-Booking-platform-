import { useState, useEffect, useRef } from 'react';
import { useHotels } from '../API/hotelsAPI';


export const useHotelPagination = (searchParams = {}) => {
    const [page, setPage] = useState(1); 
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pageSize = 6;  
    
    const prevSearchParamsRef = useRef();
    const prevPageRef = useRef();

    const fetchHotels = async (page, searchParams) => {
        try {
            setLoading(true);
            const skip = (page - 1) * pageSize;
            const fetchedHotels = await useHotels(skip, pageSize, searchParams);
            setHotels(fetchedHotels);
        } catch (err) {
            setError("Failed to load hotels");
            console.error("Error fetching hotels:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const shouldFetch =
            JSON.stringify(searchParams) !== JSON.stringify(prevSearchParamsRef.current) ||
            page !== prevPageRef.current;

        if (shouldFetch) {
            fetchHotels(page, searchParams);
        }

        prevSearchParamsRef.current = { ...searchParams };
        prevPageRef.current = page;
    }, [page, searchParams])

    const changePage = (newPage) => {
        setPage(newPage);
    };

    return { hotels, loading, error, changePage, fetchHotels, page };
};
