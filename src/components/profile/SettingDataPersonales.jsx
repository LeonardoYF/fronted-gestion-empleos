

import LabelIU from '../IU/LabelIU'
import { useState } from 'react'
import { useProfile } from '@/hooks/profile'
import AlertSuccesfull from '../alert/AlertSuccesfull'
import AlertError from '../alert/AlertError'
import ButtonIU from '../IU/ButtonIU'
import { useUser } from '@/context/UserContext'

import {Input} from "@nextui-org/react";
import InputIU from '../IU/InputIU'
function SettingDataPersonales() {
    const [name, setName] = useState('')
    const [response, setResponse] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState('')
    const { updateProfile } = useProfile({})
    const { user } = useUser()
    const submitForm = async event => {
        event.preventDefault()
        await updateProfile({ name, setStatus, setResponse, setErrors })
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <div className="p-4">
                    <div className="mb-4 text-gray-800">
                        <LabelIU
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700">
                            Nuevo nombre:
                        </LabelIU>
                        <InputIU
                            name="name"
                            id="name"
                            type="text"
                            onChange={event => setName(event.target.value)}
                            placeholder={user.name}
                            required
                            errorMessage
                            autoFocus
                            className="mt-1 p-2  border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {response && (
                            <AlertSuccesfull
                                
                                mensaje={response}></AlertSuccesfull>
                        )}

                        {errors.name && (
                            <AlertError error={errors.name}></AlertError>
                        )}
                    </div>

                    <div className="mb-4">
                        <LabelIU
                            htmlFor="imagen"
                            className="block text-sm font-medium text-gray-700">
                            Subir imagen:
                        </LabelIU>
                        <InputIU
                            id="imagen"
                            type="file"
                            accept="image/*"
                            required
                            autoFocus
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
        </>
    )
}
export default SettingDataPersonales
