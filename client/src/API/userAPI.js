import { useEffect } from "react";
import { UserContext, useUserContext } from "../contexts/UserContext";
import request from "../utils/request";


const baseUrl = "http://localhost:3030/users";

export const useLogin = () => { 


    const login = async (email, password) => { 
        const response = await request.post(
            `${baseUrl}/login`,
            {email, password},
        );
        
        return response
    }

    return {
        login,
    }

}


export const useRegister = () => { 
    
    const register = async (username ,email, password) => { 
        return request.post(
            `${baseUrl}/register`,
             {username, email, password},
        );
    }

    return { 
        register,
    }
}


export const useLogout = () => { 
    const { accessToken, userLogoutHandler } = useUserContext();

    useEffect(() => { 
        if (!accessToken) { 
            return
        }

        const options = { 
            headers: {
                "X-Authorization": accessToken,
            }
        };

        request.get(`${baseUrl}/logout`, null, options)
            .finally(
                userLogoutHandler
            );
    }, [accessToken, userLogoutHandler]);


    return {
        isLoggedOut: !!accessToken,
    };
}
