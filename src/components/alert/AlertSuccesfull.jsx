'use client'
import { useState, useEffect } from 'react'
import { useModal } from '@/context/ModalContex'

function AlertSuccesfull({ mensaje }) {
    const [visible, setVisible] = useState(true)
    const { onClose } = useModal()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false)
            onClose()
        }, 1000)

        return () => clearTimeout(timeout) // Limpiar el temporizador al desmontar el componente
    }, [])

    return (
      <div className={`fixed top-0 right-0 m-4 md:m-8 transition-opacity ${visible ? '' : 'opacity-0 hidden'}`}>
      <div className="text-white px-6 py-4 border-0 rounded relative bg-emerald-500">
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-bell" />
        </span>
        <span className="inline-block align-middle mr-8">
          <b className="capitalize"></b> {mensaje}
        </span>
        <button
          className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        >
          <span>×</span>
        </button>
      </div>
    </div>
    )
}

export default AlertSuccesfull
