"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github } from "lucide-react";

// Dummy ongoing projects data
const ongoingProjects = [
  {
    id: 1,
    title: "Medicine Management App",
    description: "A web app to manage medicines, reminders, and prescriptions with doctor-patient collaboration.",
    tags: ["Next.js", "Django", "Postgres"],
    github: "https://github.com/your-username/medicine-app",
  },
  {
    id: 2,
    title: "AI Chatbot Assistant",
    description: "An AI-powered chatbot to help students with coding, notes, and interview prep.",
    tags: ["Python", "LangChain", "React"],
    github: "https://github.com/your-username/ai-chatbot",
  },
];

const Ongoing = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">🚧 Ongoing Projects</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore projects currently in development. Check progress on GitHub or send a proposal to collaborate!
        </p>
      </div>
    
      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {ongoingProjects.map((project) => (
          <Card key={project.id} className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
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

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <Github className="w-4 h-4 mr-1" /> GitHub
                </Button>

                {/* Collaborate Request Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Collaborate
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>🤝 Collaboration Proposal</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4 mt-3">
                      <Input placeholder="Your Name" required />
                      <Input type="email" placeholder="Your Email" required />
                      <Textarea placeholder="Why do you want to collaborate?" required />
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Send Request
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Ongoing;
