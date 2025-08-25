'use client';

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Image from "next/image";

export default function EventsSection() {
  const upcomingEvents = [
    {
    title: "Intro to VsCode and Web Development",
    date: "Coming Soon",
    time: "To be Decided",
    location: "Jist Campus",
    attendees: 5,
    category: "Workshop",
    description:
      "Learn the basics of Visual Studio Code and how to set up your first web development project. Perfect for beginners!",
    status: "Open Registration"
  },
  {
    title: "Backend Development with Node.js & Express",
    date: "Coming Soon",
    time: "To be Decided",
    location: "Jist Campus",
    attendees: 5,
    category: "Workshop",
    description:
      "Learn how to create APIs, connect to databases, and build scalable backend services using Node.js and Express. Ideal for aspiring full-stack developers.",
    status: "Open Registration"
  },
  {
   title: "Intro To Python",
date: "Coming Soon",
time: "To be Decided",
location: "Jist Campus",
attendees: 5,
category: "Workshop",
description:
  "Get started with Python programming and explore how it powers Machine Learning. Learn the basics of Python syntax, data handling, and an introduction to ML concepts with hands-on examples.",
status: "Early Bird"
  }
  ];

  const pastEvents = [
   {
    title: "Intro to AI/ML",
    date: "22 Aug, 2025",
    image: "/pastEvents/saurav1.jpeg",
    description:
      "An engaging session introducing Artificial Intelligence and Machine Learning. Covered the basics of AI/ML and gave a hands-on introduction to Linear Regression."
  },
    {
      title: "Git & GitHub Workshop",
      date: "23 Aug, 2025",
      image: "/pastEvents/jyotishman2.jpeg",
      description:
        "Hands-on session where participants learned version control, branching, pull requests, and collaborative coding on GitHub."
    },
     {
    title: "App Dev Bootcamp",
    date: "23 Aug, 2025",
    image: "/pastEvents/ezaz2.jpeg",
    description:
      "A bootcamp introducing Flutter and Google IDX. Participants learned cross-platform development and built a simple Todo app as their first project."
  }
  ];

  return (
    <section id="events" className="relative flex w-full items-center justify-center py-20">
      {/* Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial fade overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Events & Activities
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our exciting events, workshops, and hackathons designed to enhance your skills and expand your network.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Events</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    >
                      {event.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} registered</span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Past Events</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                  
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold">{event.title}</CardTitle>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
