import HotelListItem from "./HotelListItem";
import HotelSearch from "../HotelSearch";
import { useHotelsContext } from "../../../contexts/HotelContext";

export default function HotelListing() {
   const { hotels } = useHotelsContext();

  console.log(hotels);
  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-br from-teal-100 to-blue-500 p-6">
      
      <div className="relative mt-0 w-full h-[300px] bg-cover bg-center" style={{
         backgroundImage: "url('https://www.tourbookers.com/media/supplier_trips/lzslwyjv/lzslwyjv_gea3mjf9kf5paqct_lg.jpg')" 
         
        }}>
        
        <div className="absolute mb-8 inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-5xl font-bold">Find Your Perfect Stay</h1>
        </div>
      </div>

      
      <HotelSearch /> 

      <HotelListItem hotels={hotels}/> 
      
    </div>
  );
}
