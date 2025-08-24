import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useHotel, useUpdateHotel } from "../../API/hotelsAPI";
import Spinner from "../Spinner";
import { useUserContext } from "../../contexts/UserContext";
import HotelCreateMultiStep from '../hotels/HotelCreateMultistep'


export default function HotelEditPage() {
  const { hotelId } = useParams();
  const { _id: userId } = useUserContext();
  const hotel = useHotel(hotelId);
  const { updateHotel } = useUpdateHotel();
  const navigate = useNavigate();

  if (!hotel) return <Spinner />;
  if (hotel._ownerId !== userId) {
    return <div className="p-6 text-red-600">You are not allowed to edit this hotel.</div>;
  }

  const handleUpdate = async (form) => {
    try {
      await updateHotel(hotelId, form);
      toast.success("Hotel updated ✅");
      navigate(`/hotels/${hotelId}/details`, { replace: true });
    } catch (e) {
      console.error(e);
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <HotelCreateMultiStep
      mode="edit"
      initialValues={hotel}
      onSubmit={handleUpdate}          
      submitLabel="Save changes"
    />
  );
}
