import HotelListItem from "./HotelListItem";
import HotelSearch from "./HotelSearch";

export default function HotelListing() {
  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-br from-teal-100 to-blue-500 p-6">
      
      <div className="relative mt-0 w-full h-[300px] bg-cover bg-center" style={{
         backgroundImage: "url('https://etimg.etb2bimg.com/photo/88350318.cms')" 
         
        }}>
        
        <div className="absolute mb-8 inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-5xl font-bold">Find Your Perfect Stay</h1>
        </div>
      </div>

      
      <HotelSearch /> 

      <HotelListItem /> 
      
    </div>
  );
}
