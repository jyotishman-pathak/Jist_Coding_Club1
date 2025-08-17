"use client"
import ProfileCard from "@/components/dashboard/profileCard";
import EventList from "@/components/dashboard/EventList";
import OngoingProjects from "@/components/dashboard/OngoingProjects";
import RoadmapResources from "@/components/dashboard/RoadmapResources";

import { usePathname } from "next/navigation";
import Hackathons from "@/components/dashboard/subDashboard/events/Hackathons";
import Past from "@/components/dashboard/subDashboard/events/Past";
import UpcomingEvents from "@/components/dashboard/subDashboard/events/UpcomingEvents";
import Completed from "@/components/dashboard/subDashboard/projects/Completed";
import { Members } from "@/components/landingPage/Members";
import Leaderboard from "@/components/dashboard/subDashboard/community/Leaderboard";




export default function ModePage() {
  const pathname = usePathname()

  if (pathname === "/dashboard/events") return <EventList />
  if (pathname === "/dashboard/events/upcoming") return <UpcomingEvents />
   if (pathname === "/dashboard/events/past") return <Past/>
    if (pathname === "/dashboard/events/hackathons") return <Hackathons />



  if (pathname === "/dashboard/projects") return <OngoingProjects />
    if (pathname === "/dashboard/projects/ongoing") return <OngoingProjects/>
      if (pathname === "/dashboard/projects/completed") return <Completed/>



  if (pathname === "/dashboard/resources") return <RoadmapResources />
  if (pathname === "/dashboard/resources/roadmap") return <RoadmapResources />
    if (pathname === "/dashboard/resources/tutorials") return <RoadmapResources />
      if (pathname === "/dashboard/resources/notes") return <RoadmapResources />


      if (pathname === "/dashboard/community/members") return <Members />
      if (pathname === "/dashboard/community/leaderboard") return <Leaderboard />


  if (pathname === "/dashboard/profile") return <ProfileCard />

  return <div>Coming soon...</div>
}
