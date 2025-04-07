import { useState, useEffect } from 'react';
import { useHotels } from '../API/hotelsAPI';


export const useHotelPagination = (searchParams = {}) => {
    const [page, setPage] = useState(1); 
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pageSize = 6;  

    const fetchHotels = async (page) => {
        try {
            setLoading(true);
            const skip = (page - 1) * pageSize;
            const fetchedHotels = await useHotels(skip, pageSize);
            setHotels(fetchedHotels);
        } catch (err) {
            setError("Failed to load hotels");
            console.error("Error fetching hotels:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels(page);
    }, [page]);

    const changePage = (newPage) => {
        setPage(newPage);
    };

    return { hotels, loading, error, changePage, fetchHotels, page };
};
