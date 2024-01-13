import { useState } from 'react'
import { useProfile } from '@/hooks/profile'
import AlertSuccesfull from '../alert/AlertSuccesfull'
import AlertError from '../alert/AlertError'
import { useUser } from '@/context/UserContext'

function SettingDelete() {
    const [response, setResponse] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState('')
    const { deleteAccount } = useProfile({})


    const submitForm = async event => {
        event.preventDefault()
        await deleteAccount({ setStatus, setResponse, setErrors })
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <div>
                    ¿Esta seguro de eliminar difinitivamente su cuenta?, todo
                    dato guardado se perdera y no se podra recuperar.
                </div>
                {response && (
                    <AlertSuccesfull  mensaje={response}></AlertSuccesfull>
                )}
                {Object.keys(errors).length > 0 && (
                    <div>
                        {Object.keys(errors).map(key => (
                            <AlertError key={key} error={errors[key]} />
                        ))}
                    </div>
                )}
                <div className="flex justify-start">
                    <button className="px-4 py-2 mt-4 bg-red-500 text-white rounded">
                        Aceptar
                    </button>
                </div>
            </form>
        </>
    )
}
export default SettingDelete
