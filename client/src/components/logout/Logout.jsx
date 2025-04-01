import { Navigate } from "react-router";
import { useLogout } from "../../API/userAPI";

export default function Logout() {

    const {isLoggedOut} = useLogout();

    return isLoggedOut
        ? <Navigate to="/" />
        : null;
}
