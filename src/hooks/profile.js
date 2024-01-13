import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useProfile = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const updateProfile = async ({
        setErrors,
        setStatus,
        setResponse,
        ...props
    }) => {
        await csrf()
        setResponse('')
        setErrors([])
        setStatus(null)
        try {
            const response = await axios.put('/api/profile/update', props)
            setResponse(response.data.message)
            response => setStatus(response.data.status)
            mutate()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const changePassword = async ({
        setErrors,
        setStatus,
        setResponse,
        ...props
    }) => {
        try {
            await csrf()
            setResponse('')
            setErrors([])
            setStatus(null)

            const response = await axios.put(
                '/api/profile/change-password',
                props,
            )
            setResponse(response.data.message)
            setStatus(response.data.status)
        } catch (error) {
            handleErrors(error, setErrors);
        }
    }

    const deleteAccount = async ({
        setErrors,
        setStatus,
        setResponse,
        ...props
    }) => {
        try {
            await csrf() // Asegúrate de obtener el token CSRF si es necesario
            const response = await axios.delete('/api/profile/delete-account');
            setResponse(response.data.message)
            setStatus(response.data.status)
            mutate()
        } catch (error) {
            handleErrors(error, setErrors);
        }
    }
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        }
        if (router.pathname === '/verify-email' && user?.email_verified_at) {
            router.push(redirectIfAuthenticated);
        }
        if (middleware === 'auth' && error) {
            logout();
        }
    }, [user, error]);

    const handleErrors = (error, setErrors) => {
        if (error.response) {
            const responseData = error.response.data;
            if (responseData.error) {
                setErrors(responseData.error);
            } else {
                setErrors([
                    responseData.errors ||
                    responseData.message ||
                    'Ha ocurrido un error.',
                ]);
            }
        } else {
            setErrors([
                'No se pudo conectar al servidor. Por favor, inténtalo de nuevo.',
            ]);
        }
    };

    return {
        user,
        updateProfile,
        changePassword,
        deleteAccount,
    }
}
