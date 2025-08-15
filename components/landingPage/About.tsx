"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function AboutJistCodingClub() {
  return (
    <section className="relative w-full py-20 px-6 bg-gradient-to-b from-gray-900 via-purple-900/50 to-black text-white overflow-hidden" id="about">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Intro Card */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-indigo-700/90 to-purple-800/90 backdrop-blur-xl min-h-[400px] lg:min-h-[450px] rounded-3xl shadow-2xl border border-purple-500/40 transition-all duration-500 hover:shadow-purple-500/30"
          >
            <div className="max-w-lg p-8">
              <h2 className="text-left text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                JIST Coding Club: Unleash Your Code!
              </h2>
              <p className="mt-4 text-left text-lg text-neutral-200">
                We’re the JIST Coding Club—a crew of fearless developers, designers, and dreamers turning wild ideas into reality. From hackathons to AI breakthroughs, we build, break, and innovate together.
              </p>
            </div>
            <img
              src="/members/club-vibes.jpg"
              width={500}
              height={500}
              alt="Club Vibes"
              className="absolute -right-6 lg:-right-[30%] -bottom-8 object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </WobbleCard>

          {/* What We Do */}
          <WobbleCard
            containerClassName="col-span-1 bg-gradient-to-br from-green-600/90 to-emerald-800/90 backdrop-blur-xl min-h-[400px] lg:min-h-[450px] rounded-3xl shadow-xl border border-green-500/40 transition-all duration-500 hover:shadow-green-500/30"
          >
            <div className="p-8">
              <h2 className="max-w-80 text-left text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                What We Create
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-lg text-neutral-200">
                Think epic coding challenges, mind-blowing hackathons, and workshops on AI, web dev, and IoT. We’re all about hands-on projects that push boundaries and spark creativity.
              </p>
            </div>
          </WobbleCard>

          {/* Why Join Us */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-br from-blue-700/90 to-cyan-800/90 backdrop-blur-xl min-h-[400px] lg:min-h-[450px] rounded-3xl shadow-xl border border-cyan-500/40 transition-all duration-500 hover:shadow-cyan-500/30"
          >
            <div className="max-w-lg p-8">
              <h2 className="text-left text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
                Why You’ll Love Us
              </h2>
              <p className="mt-4 max-w-[28rem] text-left text-lg text-neutral-200">
                Join a squad of passionate coders, tackle real-world challenges, and connect with pros. Whether you’re coding your first line or building AI models, we’ve got your back.
              </p>
            </div>
            <img
              src="/coding-club/innovation.png"
              width={500}
              height={500}
              alt="Innovation"
              className="absolute -right-10 md:-right-[35%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </WobbleCard>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-pulse {
          animation: pulse 10s infinite ease-in-out;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}