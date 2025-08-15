"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

export function FeaturedProjects() {
  const projects = [
    {
      title: "Comet Invitation",
      code: "#F7RA",
      image: "/projects/attend.png",
    },
    {
      title: "Portfolio Website",
      code: "#WD23",
      image: "/projects/notion.png",
    },
    {
      title: "Hackathon Winner App",
      code: "#HACK",
      image: "/projects/github.png",
    },
  ];

  return (
    <BackgroundBeamsWithCollision className="relative min-h-fit py-24 bg-neutral-950">
      <div className="relative z-10 max-w-7xl mx-auto px-6" id="projects">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A glimpse of our members' amazing work. Each project is a showcase
            of creativity and innovation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {projects.map((project, idx) => (
            <CardContainer key={idx} className="inter-var">
              <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/20 border border-white/10 bg-white/5 backdrop-blur-md w-96 h-auto rounded-xl p-6 transition-all duration-300">
                <CardItem
                  translateZ="50"
                  className="text-2xl font-bold text-white"
                >
                  {project.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-400 text-sm max-w-sm mt-2"
                >
                  {project.code}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
  src={project.image}
  height="1000"
  width="1000"
  className="w-full h-80 object-contain bg-black"
  alt={project.title}
/>

                </CardItem>
                <div className="flex justify-between items-center mt-6">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href="#"
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal text-white hover:bg-white/10 transition"
                  >
                    View →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition"
                  >
                    Details
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
