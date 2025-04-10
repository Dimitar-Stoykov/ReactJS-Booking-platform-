import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { BarChart2, CalendarCheck, User } from "lucide-react";

export default function SideBar() {
    return (
      <>
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">My Account</h2>
          <nav className="space-y-4">
            {[ 
              { name: "Profile", icon: <User size={20} />, path: "/profile" },
              { name: "Bookings", icon: <CalendarCheck size={20} />, path: "/profile/bookings" },
              { name: "Own Hotels", icon: <BarChart2 size={20} />, path: "/profile/own-hotels" },
            ].map(({ name, icon, path }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 p-3 w-full rounded-lg text-gray-700 hover:bg-purple-100 transition"
              >
                {icon}
                {name}
              </Link>
            ))}
          </nav>
        </aside>
    </>

    );
}
