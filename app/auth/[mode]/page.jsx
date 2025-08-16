"use client";


import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { usePathname } from "next/navigation";
import LetterGlitch from "@/components/ui/LetterGlitch";
export default function AuthPage() {
  const pathname = usePathname();
  const mode = pathname.split("/").slice(-1)[0]; 

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side */}
<div className="flex flex-col gap-4 p-6 md:p-10 bg-white dark:bg-neutral-900 border-r border-neutral-300 shadow-lg">

  <div className="flex justify-center gap-2 md:justify-start">
    <a href="/" className="flex items-center gap-2 font-medium">
      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <GalleryVerticalEnd className="size-4" />
      </div>
      JIST Coding Club
    </a>
  </div>
  <div className="flex flex-1 items-center justify-center">
    <div className="w-full max-w-xs">
      {mode === "login" ? <LoginForm /> : <SignupForm />}
    </div>
  </div>
</div>


   {/* Right side */}
<div className="bg-muted relative hidden lg:flex items-center justify-center">
  <LetterGlitch
    glitchSpeed={50}
    centerVignette={true}
    outerVignette={false}
    smooth={true}
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-5xl font-extrabold tracking-widest text-white uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
      Welcome to the Bug Factory 
    </h1>
    <p className="mt-6 max-w-lg text-xl font-semibold text-green-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
      Where errors are features,  
      crashes are celebrations,  
      and coffee is our only debugger 
    </p>
  </div>
</div>

    </div>
  );
}
