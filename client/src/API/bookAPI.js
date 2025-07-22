import useAuth from "../hooks/useAuth";
import request from "../utils/request";

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
        try { 
            const result  = await request.get(`${baseUrl}?${params.toString()}`);

            return result || [];
        }catch(error){ 
            console.error("Error fetching bookings", error);
            return [];
        }
       
    }

    return {
        getBookings,
    }
}


export const useDeleteBookings = () => { 

    const deleteBooking = (reservationId) => { 
         request.delete(`${baseUrl}/${reservationId}`)
       
    }

    return { 
        deleteBooking,
    }

}
