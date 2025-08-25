"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    projectTitle: "",
    projectDescription: "",
    instructor: "",
    photo: "",
    technologies: "",
    occuring: "UPCOMMING",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...form,
            technologies: form.technologies.split(",").map((t) => t.trim()),
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to add event");

      alert("✅ Event added successfully!");
      setForm({
        projectTitle: "",
        projectDescription: "",
        instructor: "",
        photo: "",
        technologies: "",
        occuring: "UPCOMMING",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Admin: Add Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <Label>Project Title</Label>
              <Input
                value={form.projectTitle}
                onChange={(e) => setForm({ ...form, projectTitle: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Project Description</Label>
              <Textarea
                value={form.projectDescription}
                onChange={(e) => setForm({ ...form, projectDescription: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Instructor</Label>
              <Input
                value={form.instructor}
                onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Photo URL</Label>
              <Input
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
                placeholder="https://example.com/image.png"
              />
            </div>

            <div>
              <Label>Technologies (comma separated)</Label>
              <Input
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                placeholder="Python, React"
                required
              />
            </div>

            <div>
              <Label>Occuring</Label>
              <Select
                value={form.occuring}
                onValueChange={(value) => setForm({ ...form, occuring: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPCOMMING">Upcoming</SelectItem>
                  <SelectItem value="PAST">Past</SelectItem>
                  <SelectItem value="HACKTHONS">Hackathons</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding..." : "Add Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
