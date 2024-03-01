enum ResponseStatus {
    Success,
    Error,
}

type Response<T> = {
    status: ResponseStatus.Success;
    message: string;
    data?: T;
}

type Error = Map<string, string[]>;

type ErrorResponse = {
    status: ResponseStatus.Error;
    message: string;
    errors?: Error[];
}

type APIResponse<T> = Response<T> | ErrorResponse;

const useAPI = () => {
    const BACKEND_URL = import.meta.env.BACKEND_URL;

    const fetchFromAPI = async <T>(method: string, url: string, data :object ) : Promise<APIResponse<T>> => {
        const fullURL = `${BACKEND_URL}${url}`;

        try {
            const response = await fetch(fullURL, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.json();

            if (!response.ok) {
                return {
                    status: ResponseStatus.Error,
                    message: responseData.message,
                    errors: responseData.errors
                }
            }

            return {
                status: ResponseStatus.Success,
                message: responseData.message,
                data: responseData.data
            }

        } catch (error) {
            return {
                status: ResponseStatus.Error,
                message: "Ocurrió un error inesperado"
            }
        }

    }
}

export default useAPI;