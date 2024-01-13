
import React from 'react'
import dynamic from 'next/dynamic'

export const metadata = {
    title: 'Laravel - Perfil',
}

const ProfileDinamic = dynamic(() => import('@/components/profile/Profile'), {loading: () => <p>Loading...</p>, })

export default function Profile() {
    return <ProfileDinamic />
  }
 


