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
