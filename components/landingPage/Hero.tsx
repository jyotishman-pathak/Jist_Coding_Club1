"use client";
import React from "react";
import { ContainerTextFlip } from "../ui/container-text-flip";
import { useSession } from "next-auth/react";

export function Hero() {
  const session = useSession();

  return (
    <div
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Retro Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-purple-900/80 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,150,0.3),transparent_70%)]"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(transparent,black)], [repeating-linear-gradient(90deg,transparent,transparent_30px,rgba(255,255,255,0.1)_31px,rgba(255,255,255,0.1)_32px)] [repeating-linear-gradient(0deg,transparent,transparent_30px,rgba(255,255,255,0.1)_31px,rgba(255,255,255,0.1)_32px)]"></div>
      </div>

      {/* Foreground Content */}
      <div className="p-6 sm:p-8 max-w-7xl mx-auto relative z-10 w-full text-center">
        <ContainerTextFlip
          words={["Web Dev", "App Dev", "DSA", "AI/ML", "UI/UX"]}
          className="text-lg sm:text-xl md:text-2xl font-medium mb-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
        />

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(255,0,150,0.7)] tracking-wide">
          Welcome to JIST Coding Club
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-200 max-w-xl sm:max-w-2xl mx-auto drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]">
          We build, learn, and create amazing projects together. Explore coding,
          design, and innovation with us in retro style 🚀
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {session.status === "unauthenticated" ? (
            <>
              <a
                href="/auth/sign-up"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-bold hover:scale-105 transition transform shadow-[0_0_15px_rgba(255,0,150,0.6)]"
              >
                Get Started
              </a>

              <a
                href="#about"
                className="px-6 py-3 border border-cyan-400 text-cyan-300 rounded-lg font-bold hover:bg-cyan-900/30 transition shadow-[0_0_12px_rgba(0,255,255,0.6)]"
              >
                Learn More
              </a>
            </>
          ) : (
            <a
              href="/dashboard"
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg font-bold hover:scale-105 transition transform shadow-[0_0_15px_rgba(0,255,255,0.6)]"
            >
              View Dashboard
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
