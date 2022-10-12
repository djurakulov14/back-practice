export const useHTTP = () => {
    const request = async (url, method = "GET", body = null) => {
        try {   
            const res = await fetch('http://localhost:3001' + url, {method, body})
    
            if (!res.status === 200 || !res.status === 201) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            
            console.log(res);

            const data = await res.json();

            return data
        } catch (err) {
            throw new Error('Ошибка где то')
        }
    }

    return {request}
} 