export enum ResponseStatus {
    Success,
    Error,
}

type Response<T> = {
    status: ResponseStatus.Success;
    message: string;
    code: number;
    data: T;
}

type Error = string[];

export type APIErrors = Map<string, Error>;

type ErrorResponse = {
    status: ResponseStatus.Error;
    code: number;
    message: string;
    errors?: APIErrors;
}

type APIResponse<T> = Response<T> | ErrorResponse;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

const useAPI = () => {

    const useFetch = async <T>(method: string, url: string, data :object ) : Promise<APIResponse<T>> => {
        const fullURL = `${BACKEND_URL}${url}`;

        try {
            const response = await fetch(fullURL, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.json();

            if (!response.ok) {
                return {
                    status: ResponseStatus.Error,
                    message: responseData.message,
                    code: response.status,
                    errors: responseData.errors
                }
            }

            return {
                status: ResponseStatus.Success,
                message: responseData.message,
                code: response.status,
                data: responseData.data
            }

        } catch (error) {
            return {
                status: ResponseStatus.Error,
                code: 500,
                message: "Ocurrió un error inesperado"
            }
        }

    }

    return {
        useFetch,
        ResponseStatus

    }
}

export default useAPI;