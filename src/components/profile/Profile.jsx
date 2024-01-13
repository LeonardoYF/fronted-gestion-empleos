'use client'
import CardSetting from '@/components/profile/CardSetting'
import SettingDataPersonales from '@/components/profile/SettingDataPersonales'
import SettingPassword from '@/components/profile/SettingPassword'
import { useProfile } from '@/hooks/profile'
import Modal from '@/components/Modal'
import React, { useState } from 'react'
import { useModal } from '@/context/ModalContex'
import { ModalProvider } from '@/context/ModalContex'
import SettingDelete from '@/components/profile/SettingDelete'

const Profile = () => {
    const [modalOpenData, setModalOpenData] = useState(false)
    const [modalOpenPass, setModalOpenPass] = useState(false)
    const [modalOpenDelete, setModalOpenDelete] = useState(false)
    const ChangeDataContent = () => (
        <SettingDataPersonales></SettingDataPersonales>
    )

    const ChangePasswordContent = () => <SettingPassword></SettingPassword>
        const DeleteAccountContent = () => <SettingDelete></SettingDelete>
    return (
        <div className="flex justify-center p-6 w-full">
            <div className="w-full">
                {/* Carta para cambiar datos personales */}
                <ModalProvider>
                    <CardSetting
                        title="Cambiar Datos Personales"
                        text={'Aquí puedes cambiar tu nombre o subir una foto.'}
                        titleButton={'Cambiar Datos'}
                        contentComponent={<ChangeDataContent />}
                        showModal={() => setModalOpenPass(true)}></CardSetting>
                </ModalProvider>
                {/* Carta para cambiar contraseña */}

                <ModalProvider>
                    <CardSetting
                        title="Cambiar Contraseña"
                        text={
                            'Cambia tu contraseña para mantener tu cuenta segura.'
                        }
                        titleButton={'Cambiar Contraseña'}
                        contentComponent={<ChangePasswordContent />}
                        showModal={() => setModalOpenPass(true)}
                    />
                </ModalProvider>
                {/* Carta para eliminar la cuenta */}
                <ModalProvider>
                    <CardSetting
                        title="Eliminar Cuenta"
                        contentComponent={<DeleteAccountContent/>}
                        titleButton={'Eliminar Cuenta'}
                        showModal={() =>
                            setModalOpenDelete(true)
                        }></CardSetting>
                </ModalProvider>
            </div>
        </div>
    )
}

export default Profile
