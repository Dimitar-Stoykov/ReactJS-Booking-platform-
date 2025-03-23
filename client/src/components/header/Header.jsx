import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    Home, BarChart2, User, UsersRound, LogOut, LogIn, Hotel, HousePlus,
    Logs,
} from "lucide-react";

const links = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Destinations", path: "/destinations", icon: <Hotel size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "About", path: "/about", icon: <UsersRound size={20} /> },
    { name: "Create Hotel", path: "hotels/create", icon: <HousePlus size={20} /> },
    { name: "Register", path: "/register", icon: <Logs size={20} /> },
    { name: "Log in", path: "/login", icon: <LogIn size={20} /> },
    { name: "Log out", path: "/logout", icon: <LogOut size={20} /> },
];

export default function Navigation() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsNavbarVisible(false);
            } else {
                // Scrolling up
                setIsNavbarVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full rounded-b-lg shadow-lg flex justify-between items-center py-4 px-6 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 transition-transform duration-300 ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                
                <div className="text-xl font-bold text-purple-600">BookEase</div>

                
                <div className="hidden md:flex justify-around items-center gap-10">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative flex flex-col items-center text-gray-500 transition-all duration-300 ${isActive ? "text-purple-600 font-bold" : ""
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <div className="relative flex flex-col items-center">
                                    
                                    <div
                                        className={`absolute -top-4 w-10 h-10 bg-white border-4 border-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                            }`}
                                    >
                                        {link.icon}
                                    </div>

                        
                                    <div className={`transition-all duration-300 ${isActive ? "opacity-0" : "opacity-100"}`}>
                                        {link.icon}
                                    </div>

                                   
                                    <span className="text-sm mt-1">{link.name}</span>
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>

                
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500">
                        <BarChart2 size={24} />
                    </button>
                </div>
            </nav>

            
            {isMobileMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 md:hidden z-40">
                    <div className="bg-white h-full w-3/4 p-6">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-bold text-purple-600">BookEase</div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
                                <BarChart2 size={24} />
                            </button>
                        </div>
                        <div className="mt-6 flex flex-col space-y-4">
                            {links.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-500 hover:text-purple-600 transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-2">
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
