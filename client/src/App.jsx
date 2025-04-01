import { Routes, Route } from 'react-router';
import { HotelProvider } from './providers/HotelProvider';


import About from "./components/about/About";
import Navigation from "./components/header/Header"
import Home from "./components/home/Home"
import HotelListing from "./components/hotels/hotelListing/HotelListing";
import HotelDetails from "./components/hotels/HotelDetails";
import Profile from "./components/profile/Profile";
import HotelCreate from "./components/hotels/hotelCreate/HotelCreate";
import Login from "./components/logIn/LogIn";
import Register from "./components/register/Register";
import UserProvider from './providers/UserProvider';
import Logout from './components/logout/Logout';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';



function App() {
    return (
        <>
            <UserProvider> 
                <Navigation />
                <main className="flex-1 min-h-screen">
                    <HotelProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route element={ <GuestGuard/> }>
                                <Route path='/login' element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>
                            <Route element={ <AuthGuard/> }>
                                <Route path="/destinations" element={<HotelListing />} />
                                <Route path="/hotels/:hotelId/details" element={<HotelDetails />} />
                                <Route path="/hotels/create" element={<HotelCreate />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/logout" element={<Logout/> } /> 
                            </Route>
                        </Routes>
                    </HotelProvider>
                </main>

                </UserProvider> 
                <footer className="relative z-10 left-0 right-0 z-10 p-5 text-center text-blue-200 bg-gray-900 animate-fade-in">
                    <p>&copy; 2023 BookEase. All rights reserved.</p>
                </footer>
          

        </>
    )

}

export default App
