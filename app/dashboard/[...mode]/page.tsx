"use client"
import ProfileCard from "@/components/dashboard/profileCard";
import EventList from "@/components/dashboard/EventList";
import OngoingProjects from "@/components/dashboard/OngoingProjects";
import RoadmapResources from "@/components/dashboard/RoadmapResources";
import UpcomingEvents from "@/components/dashboard/subDashboard/UpcomingEvents";
import { usePathname } from "next/navigation";




export default function ModePage() {
  const pathname = usePathname()

  if (pathname === "/dashboard/profile") return <ProfileCard />
  if (pathname === "/dashboard/events") return <EventList />
  if (pathname === "/dashboard/events/upcoming") return <UpcomingEvents />
  if (pathname === "/dashboard/projects") return <OngoingProjects />
  if (pathname === "/dashboard/resources") return <RoadmapResources />

  return <div>Coming soon...</div>
}
