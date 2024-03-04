export enum Role {
    Admin = 1,
    User = 2
}

type User = {
    id: number;
    name: string;
    email: string;
    role: Role
}

type LoginResponse = {
    token: string;
    user: User;
}

const useAuth = () => {
    const {useFetch} = useApi();


    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => user.value !== null);

    const useLogin  = async (email: string, password: string) => {
        const response = await useFetch<LoginResponse>("POST", "/login", {email, password})

        switch (response.status) {
            case ResponseStatus.Success:
                console.log(response.data)
                break;

            case ResponseStatus.Error:
                if (!response.errors) {
                    console.log(response.message)
                    return
                }
                return response.errors
        }
    }

    const verifyUser = async () => {
        const response = await useFetch("GET", "/user", {})

switch (response.status) {
            case ResponseStatus.Success:
                user.value = response.data
                break;

            case ResponseStatus.Error:
                console.log(response.message)
                break;
        }

    }

    return { useLogin, isAuthenticated, user}

}

export default useAuth;