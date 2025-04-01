import request from "../utils/request";


const baseUrl = "http://localhost:3030/users";

export const useLogin = () => { 


    const login = async (email, password) => { 
        const response = await request.post(
            `${baseUrl}/login`,
            {email, password},
        );
        console.log(response);
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
