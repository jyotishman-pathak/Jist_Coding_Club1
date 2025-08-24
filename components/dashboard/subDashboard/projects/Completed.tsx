"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

// Dummy completed projects data
const completedProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio built with Next.js, Tailwind, and shadcn/ui.",
    tags: ["Next.js", "Tailwind", "shadcn/ui"],
    image: "https://source.unsplash.com/600x400/?website,design",
    github: "https://github.com/your-username/portfolio",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce app with cart, payment, and admin dashboard.",
    tags: ["Django", "React", "Stripe"],
    image: "https://source.unsplash.com/600x400/?ecommerce,shop",
    github: "https://github.com/your-username/ecommerce",
  },
  {
    id: 3,
    title: "Weather App",
    description: "A weather forecast app using OpenWeather API and real-time geolocation.",
    tags: ["React", "API", "Bootstrap"],
    image: "https://source.unsplash.com/600x400/?weather,sky",
    github: "https://github.com/your-username/weather-app",
  },
];

const Completed = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">✅ Completed Projects</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Here are some of the projects we’ve successfully completed. Explore
          the source code and feel free to contribute!
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {completedProjects.map((project) => (
          <Card
            key={project.id}
            className="shadow-md hover:shadow-lg transition overflow-hidden"
          >
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover"
            />

            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {project.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-gray-700">{project.description}</p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub Button */}
              <Button
                variant="outline"
                className="mt-3"
                onClick={() => window.open(project.github, "_blank")}
              >
                <Github className="w-4 h-4 mr-1" /> GitHub
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Completed;
