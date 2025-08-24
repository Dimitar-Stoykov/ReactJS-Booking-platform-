// HotelEditPage.jsx
import HotelForm from '../../components/hotels/hotelCreate/HotelCreateMultiStep';

return (
  <HotelForm
    mode="edit"
    initialValues={hotel}      // arrives async; form hydrates via useEffect
    onSubmit={handleUpdate}
    submitLabel="Save changes"
  />
);
