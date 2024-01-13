'use client'
import React, { createContext, useContext, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  
  const {  onOpen, isOpen, onClose } = useDisclosure();

  

  return (
    <ModalContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </ModalContext.Provider>
  );
};