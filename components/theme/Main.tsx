import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import {NavbarMain} from '../landingPage/Navbar'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'

const Main = ({children}:{children: ReactNode}) => {
  return (
    <div className="">
     <SessionProvider>

 
     
   <ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem={false}
  disableTransitionOnChange

  // forcedTheme='dark'
>

              <Toaster />
  {children}
        </ThemeProvider>

        </SessionProvider>  
    </div>

  )
}

export default Main