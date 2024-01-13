'use client'

import Button from '@/components/MaterialIU/Button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                <div className="bg-white  rounded-lg p-8 max-w-3xl shadow-lg w-full sm:w-96">
                    <div className="mb-4 text-sm text-gray-600">
                        ¡Gracias por registrarte! Antes de comenzar, ¿podrías
                        verificar tu dirección de correo electrónico haciendo
                        clic en el enlace que acabamos de enviarte por correo?
                        Si no recibiste el correo electrónico, con gusto te
                        enviaremos otro.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            Se ha enviado un nuevo enlace de verificación a la
                            dirección de correo electrónico que proporcionaste
                            durante el registro.
                        </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            onClick={() =>
                                resendEmailVerification({ setStatus })
                            }>
                            Reenviar Correo de Verificación
                        </Button>

                        <button
                            type="button"
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                            onClick={logout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
