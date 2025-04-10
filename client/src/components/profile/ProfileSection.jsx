import { useUserContext } from "../../contexts/UserContext";
import { useBookingsCount } from "../../hooks/useBookingsCount";

export default function ProfilePage() {
  const {username, email } = useUserContext();
  const { bookings } = useBookingsCount();

  const today = new Date();

  
  const availableCount = bookings.filter(
    booking => new Date(booking.checkOut) >= today
  ).length;

  const expiredCount = bookings.filter(
    booking => new Date(booking.checkOut) < today
  ).length;

  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-5">USER INFORMATION</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Username</label>
            <p className="mt-1 text-gray-800">{username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email address</label>
            <p className="mt-1 text-gray-800">{email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">{availableCount}</div>
          <div className="text-sm text-gray-500">Active Bookings</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">{bookings.length}</div>
          <div className="text-sm text-gray-500">All Bookings</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-gray-800 mb-2">{expiredCount}</div>
          <div className="text-sm text-gray-500">Expired</div>
        </div>
      </div>
    </div>
  );
}
