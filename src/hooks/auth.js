import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
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

    const performOperation = async ({ setErrors, setResponse, setStatus, endpoint, method, props }) => {
        try {
            await csrf();
            setResponse('');
            setErrors([]);
    
            const response = await axios[method](endpoint, props);
    
            setResponse(response.data.message);
            mutate();
        } catch (error) {
            if (error.response && error.response.status !== 422) {
                throw error;
            }
    
            setErrors(error.response.data.errors);
        }
    };
    
    const register = async ({ setErrors, setResponse, ...props }) => {
        await performOperation({ setErrors, setResponse, endpoint: '/register', method: 'post', props });
    };
    
    const login = async ({ setErrors, setResponse, setStatus, ...props }) => {
        await performOperation({ setErrors, setResponse, setStatus, endpoint: '/login', method: 'post', props });
    };

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }
        
        window.location.pathname = '/login'
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

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
