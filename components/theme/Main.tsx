import React, { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import {NavbarMain} from '../landingPage/Navbar'

const Main = ({children}:{children: ReactNode}) => {
  return (
    <div className="">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
  {children}
        </ThemeProvider>
      
    </div>
  )
}

export default Main