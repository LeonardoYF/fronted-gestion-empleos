import { useProfile } from '@/hooks/profile'

import InputPasswordIU from '@/components/IU/InputPasswordIU'

import LabelIU from '../IU/LabelIU'
import ButtonIU from '@/components/IU/ButtonIU'
import { useState } from 'react'
import AlertSuccesfull from '../alert/AlertSuccesfull'
import AlertError from '../alert/AlertError'

function SettingPassword() {
    const { changePassword } = useProfile()
    const [errors, setErrors] = useState([])
    const [old_password, setOld_Password] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [response, setResponse] = useState('')
    const [status, setStatus] = useState('')

    const submitForm = async event => {
        event.preventDefault()
        await changePassword({
            old_password,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setResponse,
            setStatus,
        })
    }
    return (
        <form onSubmit={submitForm}>
            <div className="p-4">
                <div className="mb-4">
                    <LabelIU
                        htmlFor="passActual"
                        className="block text-sm font-medium text-gray-700">
                        Contraseña actual :
                    </LabelIU>
                    <InputPasswordIU
                        onChange={event => setOld_Password(event.target.value)}
                        id="passActual"
                        type="password"
                        name="old_password"
                        placeholder="Contraseña actual"
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                {response && (
                    <AlertSuccesfull mensaje={response}></AlertSuccesfull>
                )}

                {Object.keys(errors).length > 0 && (
                    <div>
                        {Object.keys(errors).map(key => (
                            <AlertError key={key} error={errors[key]} />
                        ))}
                    </div>
                )}

                <div className="mb-4">
                    <LabelIU
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700">
                        Nueva contraseña :
                    </LabelIU>
                    <InputPasswordIU
                        onChange={event => setPassword(event.target.value)}
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Nueva contraseña"
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <LabelIU
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700">
                        Confirmar nueva contraseña :
                    </LabelIU>
                    <InputPasswordIU
                        onChange={event =>
                            setPasswordConfirmation(event.target.value)
                        }
                        id="confirmPassword"
                        type="password"
                        name="password-confirmation"
                        placeholder="Confirmar nueva contraseña"
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="flex justify-start">
                    <ButtonIU className="px-4 py-2 bg-blue-500 text-white rounded">
                        Aceptar
                    </ButtonIU>
                </div>
            </div>
        </form>
    )
}
export default SettingPassword
