import { Outlet, Link } from 'react-router-dom';

export default function ProfileLayout() {
  const menuItems = [
    { name: 'Profile', path: '/profile', icon: '📝' },
    { name: 'Bookings', path: 'bookings', icon: '📅' },
    { name: 'Own Hotels', path: 'own-hotels', icon: '🏨' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Hello Jesse</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Manage your profile, bookings, and hotels
          </p>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
