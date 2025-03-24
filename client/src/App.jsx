import About from "./components/about/About";
import Navigation from "./components/header/Header"
import Home from "./components/home/Home"
import {Routes, Route} from 'react-router';
import HotelListing from "./components/hotels/HotelListing";
import HotelDetails from "./components/hotels/HotelDetails";
import Profile from "./components/profile/Profile";
import HotelCreate from "./components/hotels/hotelCreate/HotelCreate";
import Login from "./components/logIn/LogIn";



function App() {
  return ( 
    <>
    
      <Navigation /> 
      <main className="flex-1 min-h-screen">
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About /> } /> 
          <Route path="/destinations" element={<HotelListing /> } /> 
          <Route path="/hotels/details" element={<HotelDetails /> } />
          <Route path="/profile" element={<Profile /> } /> 
          <Route path="/hotels/create" element={<HotelCreate/> } /> 
          <Route path='/login' element={<Login />} /> 
        </Routes> 

        </main>
        
        <footer className="relative z-10 left-0 right-0 z-10 p-5 text-center text-blue-200 bg-gray-900 animate-fade-in">
          <p>&copy; 2023 BookEase. All rights reserved.</p>
        </footer>
      
    </>
  )
  
}

export default App
