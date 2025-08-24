"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const pastEvents = [
  {
    id: 1,
    title: "Intro to AI/ML",
    date: "July 10, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "ETC 7th Sem Room",
    description: "Hands-on workshop to learn AI/ML fundamentals.",
    featured: true,
  },
  {
    id: 2,
    title: "Hackathon 2024",
    date: "Dec 5, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Exam Hall JIST",
    description: "A 8-hour coding challenge with exciting prizes.",
  },
  {
    id: 3,
    title: "AI/ML Seminar",
    date: "Aug 20, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Exam Hall JIST",
    description: "Seminar on latest trends and research in AI/ML.",
  },
];

const Past = () => {
  return (
    <div className="p-6 space-y-10">
      {/* Header + Stats */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">📚 Past Events</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          A look back at our previous workshops, hackathons, and meetups. Learn what we have accomplished so far!
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{pastEvents.length}</p>
            <p className="text-gray-500 text-sm">Total Events</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {pastEvents.filter(e => e.featured).length}
            </p>
            <p className="text-gray-500 text-sm">Featured</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{pastEvents.filter(e => !e.featured).length}</p>
            <p className="text-gray-500 text-sm">Other Events</p>
          </div>
        </div>
      </div>

      {/* Timeline / Past Events */}
      <div className="relative border-l-2 border-gray-200 ml-4">
        {pastEvents.map((event, idx) => (
          <div key={event.id} className="mb-10 ml-6 relative">
            {/* Timeline Dot */}
            <span
              className={`absolute -left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center ${
                event.featured ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {event.featured ? "★" : idx + 1}
            </span>

            <Card className={`shadow-md ${event.featured ? "border-blue-500" : ""}`}>
              <CardHeader className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
                {event.featured && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">{event.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <Calendar size={16} /> {event.date}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <Clock size={16} /> {event.time}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <MapPin size={16} /> {event.location}
                  </span>
                </div>
                <Button variant="outline" className="mt-2">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Past;
