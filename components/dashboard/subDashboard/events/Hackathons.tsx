"use client";

import React from "react";
import { Rocket } from "lucide-react";

const Hackathons = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
      <Rocket className="w-16 h-16 text-blue-600 animate-bounce" />
      <h1 className="text-4xl font-bold"> Hackathons</h1>
      <p className="text-gray-600 text-lg">Exciting challenges are on the way!</p>
      <div className="px-6 py-2 rounded-full bg-blue-100 text-blue-800 font-medium">
        Coming Soon...
      </div>
    </div>
  );
};

export default Hackathons;
