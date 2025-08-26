"use client";
import React from "react";
import ChromaGrid from "../ui/ChromaGrid";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export function Members() {
  const items = [
     {
      image: "/members/kankan.jpeg",
      title: "Kankan",
      subtitle: "Lead + UI/UX Lead",
      handle: "@kankan",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://github.com/sarahjohnson",
    },

     {
      image: "/members/ezaz.jpeg",
      title: "Ezaz Ahmed",
      subtitle: "Co-Lead + App Lead",
      handle: "@ezaz",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/ezeehere/",
    },
    {
      image: "/members/sap1.jpg",
      title: "Saptarshi Borkataky",
      subtitle: "Project Lead",
      handle: "@saptarshi",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/saptarshi-borkataky-34a740231/",
    },
     
    {
      image: "/members/jyotishman.png",
      title: "Jyotishman Pathak",
      subtitle: "Web Lead + DSA ",
      handle: "@jyotishman",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/jyotishmanpathak/",
    },
     
   
    {
      image: "/members/ml.jpg",
      title: "Saurav Dutta",
      subtitle: "Ai/ML Lead",
      handle: "@saurav",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/sauravduttafreelancer/",
    },
       {
      image: "/members/hriday.jpeg",
      title: "Hridayam Gogoi",
      subtitle: "Design Lead",
      handle: "@hridayam",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/hridayam-gogoi-7730a2342/",
    },
    {
      image: "/members/isha.jpg",
      title: "Isha Mahanta",
      subtitle: "Visual Lead",
      handle: "@Isha",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.instagram.com/ishazuwu_/",
    },
    
    {
      image: "/members/event.jpg",
      title: "Abhishek Sharma",
      subtitle: "Event Lead",
      handle: "@Abhisheik",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "#",
    },
    {
      image: "/members/social-media.jpg",
      title: "Chandreyi Kataki",
      subtitle: "Social Media Lead",
      handle: "@Chandreyi",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "#",
    },
     {
      image: "/members/abhinav.jpeg",
      title: "Abhinav Kaman",
      subtitle: "Treasurer",
      handle: "@Abhinav",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "#",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900" id="members">
      {/* Background Effects */}
      <ShootingStars />
      <StarsBackground />

      {/* Foreground content */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-white">Our Members</h2>
          <p className="text-lg text-gray-300">
            Turning your ideas into reality with magic and precision
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex justify-center">
              <ChromaGrid
                className="w-[280px] overflow-hidden [&_img]:object-cover [&_img]:w-full [&_img]:h-full [&>*]:bg-transparent"
                items={[item]}
                radius={300}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
