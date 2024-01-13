import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aplicacion',
  description: 'Sistema de Gestion de empleos',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="es" className=' light'>
      <body className='text-gray-800'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
