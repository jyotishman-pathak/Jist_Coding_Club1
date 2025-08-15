"use client";
import React from "react";
import Galaxy from "../ui/react-bits/Galaxy";
import { ContainerTextFlip } from "../ui/container-text-flip";

export function Hero() {
  return (
    <div id="home" className="relative w-full rounded-md flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden
      min-h-screen md:h-[60rem]">
      
      {/* Galaxy Background - Full Cover */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Galaxy
          mouseRepulsion={false}
          mouseInteraction={true}
          density={0.5}
          glowIntensity={0.5}
          saturation={0.2}
          hueShift={24}
        />
      </div>

      {/* Foreground Content */}
      <div className="p-6 sm:p-8 max-w-7xl mx-auto relative z-10 w-full text-center">
        <ContainerTextFlip
  words={["Web Dev", "App Dev", "DSA", "AI/ML", "UI/UX"]}
  className="text-lg sm:text-xl md:text-2xl font-medium mb-4"
/>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Welcome to Jist Coding Club
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-300 max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl mx-auto">
          We build, learn, and create amazing projects together. Explore coding, 
          design, and innovation with us.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="px-5 py-3 border border-neutral-400 text-neutral-300 rounded-lg font-medium hover:bg-neutral-800 transition text-sm sm:text-base"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
