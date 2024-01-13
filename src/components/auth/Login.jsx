'use client'

import ButtonIU from '@/components/IU/ButtonIU'
import InputIU from '@/components/IU/InputIU'
import LabelIU from '@/components/IU/LabelIU'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AlertError from '@/components/alert/AlertError'
import AlertSuccesfullAuth from '@/components/alert/AlertaSuccesfullAuth'
import InputPasswordIU from '@/components/IU/InputPasswordIU'
import CheckBoxIU from '@/components/IU/CheckBoxIU'
import { useCallback } from 'react'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })
    const handleEmailChange = useCallback(event => {
        setEmail(event.target.value);
    }, [setEmail]);
    
    const handlePasswordChange = useCallback(event => {
        setPassword(event.target.value);
    }, [setPassword]);
    
    const handleRememberChange = useCallback(event => {
        setShouldRemember(event.target.checked);
    }, [setShouldRemember]);
    const submitForm = async event => {
        event.preventDefault()
        login({
            email,
            password,
            setResponse,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
       
    }

    return (
        <div className="flex items-center h-screen justify-center  bg-slate-950 ">
            <div className="w-full xl:w-2/5 p-6 ">
                <div className="rounded-lg bg-slate-50 shadow-lg p-8  text-gray-800  ">
                    <div className="block">
                        <h3 className=" block font-bold text-center text-3xl text-gray-700">
                            Iniciar Sesión
                        </h3>
                        {response && <AlertSuccesfullAuth mensaje={response} />}
                        <form onSubmit={submitForm}>
                            {/* Email Address */}
                            <div className="mb-4">
                                <LabelIU htmlFor="email">Email</LabelIU>

                                <InputIU
                                    id="email"
                                    type="email"
                                    value={email}
                                    className="block w-full"
                                    onChange={handleEmailChange}
                                    placeholder = "Email"
                                    required
                                />
                                
                                {errors.email ? <AlertError error={errors.email} /> : null}
                            </div>

                            {/* Password */}
                            <div className="mt-4">
                                <LabelIU htmlFor="password">Contraseña</LabelIU>
                                <InputPasswordIU
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    autoComplete="current-password"
                                />
                            </div>

                            {/* Remember Me */}
                            <div className="block mt-4">
                                <LabelIU
                                    htmlFor="remember_me"
                                    className="inline-flex items-center">
                                    <CheckBoxIU
                                        id="remember_me"
                                        name="remember"
                                        
                                        onChange={handleRememberChange}
                                    />

                                    <span className="ml-2 text-sm text-gray-600">
                                        Recuerdame
                                    </span>
                                </LabelIU>
                            </div>
                            <div className="flex w-full mt-2 justify-between max-[280px]:block">
                                <div className=" items-start justify-start ">
                                    <Link
                                        href="/forgot-password"
                                        className="underline text-sm text-gray-600 hover:text-gray-900">
                                        Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <div className=" justify-end">
                                    <Link
                                        href="/register"
                                        className="underline text-sm text-gray-600 hover:text-gray-900 justify-end">
                                        No estas Registrado?
                                    </Link>
                                </div>
                            </div>
                            <ButtonIU type="submit" className="ml-3 mt-4" loading={loading} color="primary">Login</ButtonIU>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
