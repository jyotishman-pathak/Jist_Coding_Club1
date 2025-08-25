"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import axios from "axios";
import { Events, Occuring } from "@/lib/backend/fetch";


// ✅ must be string enums (to match your API JSON)


export async function fetchEvents(): Promise<Events[]> {
  try {
    const res = await axios.get<Events[]>("/api/events");
    return res.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await fetchEvents();
    
      const filtered = allEvents.filter((e) => e.occuring === Occuring.UPCOMMING);
      setUpcomingEvents(filtered);
    };
    loadEvents();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">📅 Upcoming Events</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Hackathons, workshops, and coding sessions you can join! Don’t miss out on exciting opportunities to learn and network.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{upcomingEvents.length}</p>
            <p className="text-gray-500 text-sm">Upcoming</p>
          </div>
        </div>
      </div>

      <div className="relative border-l-2 border-gray-200 ml-4">
        {upcomingEvents.map((event, idx) => (
          <div key={event.id} className="mb-10 ml-6 relative">
            <span
              className={`absolute -left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center ${
                idx === 0 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {idx + 1}
            </span>

            <Card className="shadow-md">
              <CardHeader className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{event.projectTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">{event.projectDescription}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <Calendar size={16} /> {new Date(event.createdAt).toDateString()}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <MapPin size={16} /> Location TBD
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <Clock size={16} /> Time TBD
                  </span>
                </div>
                <Button className="mt-2">View Details</Button>
              </CardContent>
            </Card>
          </div>
        ))}

        {upcomingEvents.length === 0 && (
          <p className="text-center text-gray-500">No upcoming events found.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
