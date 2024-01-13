import React from 'react'

import UserMenu from '@/components/UserMenu'
import Notificaciones from '@/components/Notificaciones'
import SideBar from '@/components/SideBar'

const Navigation = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <nav className="bg-white border-b w-screen lg:w-auto  border-gray-200 shadow-md">
            {/* Primary Navigation Menu */}
            <div className=" mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex ">
                        <div className="flex items-center">
                            {/* Hamburger */}
                            <div className="-mr-2 flex items-center  border-gray-200 shadow-md lg:hidden">
                                <button
                                    onClick={() => setOpen(open => !open)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24">
                                        {open ? (
                                            <path
                                                className="inline-flex"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        ) : (
                                            <path
                                                className="inline-flex"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>

                            <button className="flex-shrink-0 p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <Notificaciones />
                        <UserMenu />
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className=" lg:hidden ">
                    {/* Responsive Settings Options */}
                    <SideBar
                        className={
                            'w-3/5 relative md:w-2/5 bg-slate-400 rounded-lg shadow-xl transition-transform duration-300 ease-in-out'
                        }></SideBar>
                </div>
            )}
        </nav>
    )
}

export default Navigation
