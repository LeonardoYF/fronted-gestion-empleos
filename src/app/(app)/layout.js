'use client'

import { useAuth } from '@/hooks/auth'

import Loading from '@/app/(app)/loading'
import dynamic from 'next/dynamic'
import { UserProvider } from '@/context/UserContext'
import SideBar from '@/components/SideBar'
import Navigation from '@/app/(app)/Navigation'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    if (!user) {
        return <Loading />
    }
    
    
    return (
        <UserProvider>
            <div className="flex w-full bg-gray-100">
                <div className="sidebar text-sm w-1/5 min-h-screen bg-gray-800 text-white p-7 hidden  lg:block">
                    <SideBar />
                </div>

                <div className="block w-4/5 ">
                    <Navigation />
                    <main>{children}</main>
                </div>
            </div>
        </UserProvider>
    )
}

export default AppLayout
