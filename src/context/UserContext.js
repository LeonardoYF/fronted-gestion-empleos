'use client'
import { useAuth } from '@/hooks/auth';
import { createContext } from 'react';
import { useContext } from 'react';

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);



export const UserProvider = ({children}) =>{
    const {user} = useAuth();
    return(
        <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
    )
}