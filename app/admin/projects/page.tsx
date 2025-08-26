"use client";

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProjectForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
const [occuring, setOccuring] = useState<"ONGOING" | "COMPLETED">("ONGOING");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/projects", {
        projectTitle,
        projectDescription,
        githubUrl,
        occuring,
      });

      if (response.status === 200) {
        setMessage("✅ Project added successfully!");
        setProjectTitle("");
        setProjectDescription("");
        setGithubUrl("");
      setOccuring("ONGOING");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setMessage("❌ Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Add a New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Project Title</Label>
            <Input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Enter project title"
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Write about your project..."
              required
            />
          </div>

          <div>
            <Label>GitHub URL</Label>
            <Input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/user/repo"
            />
          </div>

          <div>
            <Label>Occuring</Label>
           <Select value={occuring} onValueChange={(v) => setOccuring(v as any)}>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ONGOING">Ongoing</SelectItem>
    <SelectItem value="COMPLETED">Completed</SelectItem>
  </SelectContent>
</Select>

          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Project"}
          </Button>

          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
