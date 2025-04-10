import React, { useState } from 'react';
import HotelListItem from './HotelListItem';
import HotelSearch from '../HotelSearch';

import Spinner from '../../Spinner';
import { useHotelPagination } from '../../../hooks/useHotelPagination';


export default function HotelListing() {
    const [searchParams, setSearchParams] = useState('');
    const { hotels, loading, error, changePage} = useHotelPagination(searchParams);

    const [formData, setFormData] = useState({
        country: "",
        city: "",
        checkIn: "",
        checkOut: "",
        maxGuests: "",
    });

    const handleSearch = (params) => {
        setSearchParams(params);
        changePage(1); 
    };


    if (loading) {
        return (
            <Spinner />
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 bg-gradient-to-br from-teal-100 to-blue-500 p-6">
                <div className="text-center text-white">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 bg-gradient-to-br from-teal-100 to-blue-500 p-6">
            <div
                className="relative mt-0 w-full h-[300px] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://www.tourbookers.com/media/supplier_trips/lzslwyjv/lzslwyjv_gea3mjf9kf5paqct_lg.jpg')",
                }}
            >
                <div className="absolute mb-8 inset-0 bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
                    <h1 className="text-5xl font-bold">Find Your Perfect Stay</h1>
                </div>
            </div>

            <HotelSearch onSearch={handleSearch} formAction={{formData, setFormData}} />

            
            <HotelListItem hotels={hotels} dates={{checkIn: formData.checkIn, checkOut: formData.checkOut}} />

          
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => changePage(1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    First
                </button>
                <button
                    onClick={() => changePage((prevPage) => Math.max(prevPage - 1, 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Previous
                </button>
                <button
                    onClick={() => changePage((prevPage) => prevPage + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Next
                </button>
                
            </div>
        </div>
    );
}
