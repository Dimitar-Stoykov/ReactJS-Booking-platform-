import useAuth from "../hooks/useAuth";

const baseUrl = "http://localhost:3030/data/bookings";


export const useCreateBooking = () =>  { 
    const { request } = useAuth();

    const create = async (bookingData) => { 
         request.post(baseUrl, bookingData);
    }

    return {
        create,
    }
    
}


export const useBookings = () => { 

    const getBookings = async (userId) => { 
        const params = new URLSearchParams();
        params.append('where', `_ownerId="${userId}"`);
        
        return await fetch(`${baseUrl}?${params.toString()}`);
       
    }

    return {
        getBookings,
    }
}
