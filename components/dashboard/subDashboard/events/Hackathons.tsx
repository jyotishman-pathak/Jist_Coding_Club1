"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Cpu, Rocket } from "lucide-react";
import axios from "axios";
import { Events, fetchEvents, Occuring } from "@/lib/backend/fetch";



const Hackathons = () => {
  const [hackathons, setHackathons] = useState<Events[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await fetchEvents();
      const filtered = allEvents.filter((e) => e.occuring === Occuring.HACKTHONS);
      setHackathons(filtered);
    };
    loadEvents();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">🚀 Hackathons</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Build, innovate, and compete! Check out all hackathons happening on our platform.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{hackathons.length}</p>
            <p className="text-gray-500 text-sm">Hackathons</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {hackathons.map((event) => (
          <Card key={event.id} className="shadow-md hover:shadow-xl transition">
            <CardHeader className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Cpu size={18} /> {event.projectTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700">{event.projectDescription}</p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                  <Calendar size={16} /> {new Date(event.createdAt).toDateString()}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100">
                  <Users size={16} /> Team Size: TBD
                </span>
              </div>
              <Button className="mt-2">Join Hackathon</Button>
            </CardContent>
          </Card>
        ))}

        {hackathons.length === 0 && (
          <p className="text-center text-gray-500 col-span-2">No hackathons found.</p>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
