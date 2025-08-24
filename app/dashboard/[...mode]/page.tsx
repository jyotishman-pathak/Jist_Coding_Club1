"use client"
import { usePathname, redirect } from "next/navigation";

import ProfileCard from "@/components/dashboard/profileCard";
import EventList from "@/components/dashboard/EventList";
import OngoingProjects from "@/components/dashboard/OngoingProjects";
import RoadmapResources from "@/components/dashboard/RoadmapResources";

import Hackathons from "@/components/dashboard/subDashboard/events/Hackathons";
import Past from "@/components/dashboard/subDashboard/events/Past";
import UpcomingEvents from "@/components/dashboard/subDashboard/events/UpcomingEvents";
import Completed from "@/components/dashboard/subDashboard/projects/Completed";
import { Members } from "@/components/landingPage/Members";
import Leaderboard from "@/components/dashboard/subDashboard/community/Leaderboard";

export default function ModePage() {
  const pathname = usePathname();

  // Redirect root sections to their defaults
  if (pathname === "/dashboard/events") redirect("/dashboard/events/upcoming");
  if (pathname === "/dashboard/projects") redirect("/dashboard/projects/ongoing");
  if (pathname === "/dashboard/resources") redirect("/dashboard/resources/roadmap");

  // Events
  if (pathname === "/dashboard/events/upcoming") return <UpcomingEvents />;
  if (pathname === "/dashboard/events/past") return <Past />;
  if (pathname === "/dashboard/events/hackathons") return <Hackathons />;

  // Projects
  if (pathname === "/dashboard/projects/ongoing") return <OngoingProjects />;
  if (pathname === "/dashboard/projects/completed") return <Completed />;

  // Resources
  if (pathname === "/dashboard/resources/roadmap") return <RoadmapResources />;
  if (pathname === "/dashboard/resources/tutorials") return <RoadmapResources />;
  if (pathname === "/dashboard/resources/notes") return <RoadmapResources />;

  // Community
  if (pathname === "/dashboard/community/members") return <Members />;
  if (pathname === "/dashboard/community/leaderboard") return <Leaderboard />;

  // Profile
  if (pathname === "/dashboard/profile") return <ProfileCard />;

  return <div>Coming soon...</div>;
}
