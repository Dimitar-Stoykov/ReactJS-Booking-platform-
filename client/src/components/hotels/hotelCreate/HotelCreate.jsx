import { useState } from "react";
import { Camera } from "lucide-react";
import { useCreateHotel } from "../../../API/hotelsAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HotelForm from '../HotelCreateMultistep/';


export default function HotelCreateMultiStep() {
   const { createHotel } = useCreateHotel();
  const navigate = useNavigate();

  const handleCreate = async (form) => {
    const created = await createHotel(form);
    toast.success(`Successfully created hotel: ${form.hotelName}`);
    navigate(`/hotels/${created._id}/details`);
  };

  return <HotelForm mode="create" onSubmit={handleCreate} submitLabel="Create Hotel" />;
}
