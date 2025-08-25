"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy } from "lucide-react";
import axios from "axios";
import { Events, fetchEvents, Occuring } from "@/lib/backend/fetch";


const PastEvents = () => {
  const [pastEvents, setPastEvents] = useState<Events[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await fetchEvents();
      const filtered = allEvents.filter((e) => e.occuring === Occuring.PAST);
      setPastEvents(filtered);
    };
    loadEvents();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Past Events</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore events we’ve hosted before – hackathons, workshops, and coding sessions that made an impact.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{pastEvents.length}</p>
            <p className="text-gray-500 text-sm">Completed</p>
          </div>
        </div>
      </div>

      <div className="relative border-l-2 border-gray-200 ml-4">
        {pastEvents.map((event, idx) => (
          <div key={event.id} className="mb-10 ml-6 relative">
            <span
              className={`absolute -left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center ${
                idx === 0 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              <Trophy size={16} />
            </span>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{event.projectTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">{event.projectDescription}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <Calendar size={16} /> {new Date(event.createdAt).toDateString()}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <MapPin size={16} /> Location: Completed
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                    <Clock size={16} /> Time: Past
                  </span>
                </div>
                <Button variant="outline" className="mt-2">View Recap</Button>
              </CardContent>
            </Card>
          </div>
        ))}

        {pastEvents.length === 0 && (
          <p className="text-center text-gray-500">No past events found.</p>
        )}
      </div>
    </div>
  );
};

export default PastEvents;
