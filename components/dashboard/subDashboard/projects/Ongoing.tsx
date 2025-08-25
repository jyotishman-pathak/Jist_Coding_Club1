"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { fetchProjects, Project, ProjectOccurence } from "@/lib/backend/fetch";


const Ongoing = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadProjects = async () => {
    const data = await fetchProjects();
    // Filter only ongoing projects
    const ongoingProjects = data.filter(
       (project) => project.occuring === ProjectOccurence.ONGOING
    );
    setProjects(ongoingProjects);
    setLoading(false);
  };
  loadProjects();
}, []);
  if (loading) {
    return <p className="text-center mt-10">Loading ongoing projects...</p>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">🚀 Ongoing Projects</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          These are the projects we are currently working on. Stay tuned for updates!
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="shadow-md hover:shadow-lg transition overflow-hidden"
          >
            {/* Project Image */}
            {project.githubUrl && (
              <img
                src={`https://source.unsplash.com/600x400/?${encodeURIComponent(
                  project.projectTitle
                )}`}
                alt={project.projectTitle}
                className="w-full h-40 object-cover"
              />
            )}

            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {project.projectTitle}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-gray-700">{project.projectDescription}</p>

              {/* GitHub Button */}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <Github className="w-4 h-4 mr-1" /> GitHub
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Ongoing;
