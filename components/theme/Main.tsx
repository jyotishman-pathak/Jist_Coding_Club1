import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import {NavbarMain} from '../landingPage/Navbar'
import { Toaster } from 'sonner'

const Main = ({children}:{children: ReactNode}) => {
  return (
    <div className="">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <Toaster />
  {children}
        </ThemeProvider>
      
    </div>
  )
}

export default Main