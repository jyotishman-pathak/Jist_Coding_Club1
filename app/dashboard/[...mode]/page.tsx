"use client"
import { usePathname, redirect } from "next/navigation";

import ProfileCard from "@/components/dashboard/profileCard";




import Hackathons from "@/components/dashboard/subDashboard/events/Hackathons";
import Past from "@/components/dashboard/subDashboard/events/Past";
import UpcomingEvents from "@/components/dashboard/subDashboard/events/UpcomingEvents";
import Completed from "@/components/dashboard/subDashboard/projects/Completed";
import { Members } from "@/components/landingPage/Members";
import Leaderboard from "@/components/dashboard/subDashboard/community/Leaderboard";
import Ongoing from "@/components/dashboard/subDashboard/projects/Ongoing";
import BugFactory from "@/components/dashboard/subDashboard/bugFactory/page";
import Roadmap from "@/components/dashboard/subDashboard/resources/Roadmaps";

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
  if (pathname === "/dashboard/projects/ongoing") return <Ongoing />;
  if (pathname === "/dashboard/projects/completed") return <Completed />;

  // Resources
  if (pathname === "/dashboard/resources/roadmap") return <Roadmap />;
  // if (pathname === "/dashboard/resources/tutorials") return <RoadmapResources />;
  // if (pathname === "/dashboard/resources/notes") return <RoadmapResources />;

  // Community
  if (pathname === "/dashboard/community/members") return <Members />;
  if (pathname === "/dashboard/community/leaderboard") return <Leaderboard />;

  // Profile
  if (pathname === "/dashboard/profile") return <ProfileCard />;
   if (pathname === "/dashboard/bug-factory") return <BugFactory />;

  return <div>Coming soon...</div>;
}
