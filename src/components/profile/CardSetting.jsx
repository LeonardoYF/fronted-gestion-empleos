'use client'

import React from 'react'
import Modal from '@/components/Modal'
import ButtonIU from '@/components/IU/ButtonIU'
import { useModal } from '@/context/ModalContex'
const CardSetting = ({ contentComponent,title, text,showModal,titleButton, ...props }) => {
    const {onOpen} = useModal()
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full ">
            <div className="text-lg text-gray-600 font-semibold mb-2">{title}</div>
            <p className="text-gray-600 mb-4">{text}</p>
            <ButtonIU color="primary" onClick={onOpen}  {...props}>
                {titleButton}
            </ButtonIU>
            <Modal
                    title={title}
                    contentComponent={contentComponent}
                />
        </div>
    )
}
export default CardSetting
