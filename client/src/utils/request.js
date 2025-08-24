
const request = async (method, url, data, options = {}) => {
    if (method !== 'GET') {
        options.method = method;
    }

    const authData = JSON.parse(localStorage.getItem('auth'));

    if (authData?.accessToken) {
        options = {
            ...options,
            headers: {
                'X-Authorization': authData.accessToken,
                ...options.headers,
            },
        }
        
    }

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        }
    }
    try { 
        const response = await fetch(url, options);
        const responseContentType = response.headers.get('Content-Type');
        if (response.status === 304) {
            return {}; 
        }
        const result = await response.json();

        if (!responseContentType) {
            return;
        }
        return result;
    
    } catch (err) {
        
       console.error(err.message);
       throw err;
       
    }
    
    

};

export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
    baseRequest: request,
}
