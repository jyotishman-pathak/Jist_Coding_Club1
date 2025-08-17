"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/react-bits/resizable-navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../theme/Mode";

export function NavbarMain() {

  const session = useSession();




  const navItems = [
  
    { name: "About", link: "#about" },
    { name: "Members", link: "#members" },
    { name: "Projects", link: "#projects" },
     
    { name: "Events", link: "#events" },
     { name: "Join", link: "#join" },

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full" >
     <Navbar className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
  {/* Desktop Navigation */}
  <NavBody>
    <NavbarLogo />
    <NavItems items={navItems} />
    <div className="flex items-center gap-4">
  
    {session.status === "authenticated" ? 
    
  <Link href="/dashboard" >
  <NavbarButton as="button" variant="primary">
    Dashboard
  </NavbarButton>
</Link>

:  

<Link href="/auth/sign-up" >
  <NavbarButton as="button" variant="primary">
    Sign Up
  </NavbarButton>
</Link>


  
  }
  
  {/* <ModeToggle/> */}
  
 

      
    </div>
  </NavBody>

  {/* Mobile Navigation */}
  <MobileNav>
    <MobileNavHeader>
      <NavbarLogo />
      <MobileNavToggle
        isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
    </MobileNavHeader>

    <MobileNavMenu
      isOpen={isMobileMenuOpen}
      onClose={() => setIsMobileMenuOpen(false)}
    >
      {navItems.map((item, idx) => (
        <a
          key={`mobile-link-${idx}`}
          href={item.link}
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative text-neutral-600 dark:text-neutral-300"
        >
          <span className="block">{item.name}</span>
        </a>
      ))}
      <div className="flex w-full flex-col gap-4">
       {session.status === "authenticated" ? 
    
  <Link href="/dashboard" >
  <NavbarButton as="button" variant="primary">
    Dashboard
  </NavbarButton>
</Link>

:  

<Link href="/auth/sign-up" >
  <NavbarButton as="button" variant="primary">
    Sign Up
  </NavbarButton>
</Link>

  
  }

      </div>
    </MobileNavMenu>
  </MobileNav>
</Navbar>
    </div>
  );
}   