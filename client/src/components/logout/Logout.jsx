import { Navigate } from "react-router";
import { useLogout } from "../../API/userAPI";


export default function Logout() {

    const {isLoggedOut} = useLogout();

    
    localStorage.removeItem('auth');

    return isLoggedOut
        ? <Navigate to="/" />
        : null;
}
