"use client"

import * as React from "react"
import {
  LayoutDashboard,
  CalendarDays,
  Hammer,
  BookOpen,
  Users,
  User,
  Flame,
  GraduationCap,
  Bug,
  Globe,
  Brain,
  Code2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
export const data = {
  user: {
    name: "Jyotishman",
    email: "jyotishman@jist.club",
    avatar: "/avatars/default.png",
  },
  teams: [
    {
      name: "Web Dev Squad",
      logo: Globe,
      plan: "Frontend + Backend",
    },
    {
      name: "AI & ML Crew",
      logo: Brain,
      plan: "Machine Learning",
    },
    {
      name: "CP Ninjas",
      logo: Code2,
      plan: "Competitive Programming",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: CalendarDays,
      items: [
        { title: "Upcoming", url: "/dashboard/events/upcoming" },
        { title: "Past", url: "/dashboard/events/past" },
        { title: "Hackathons", url: "/dashboard/events/hackathons" },
      ],
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: Hammer,
      items: [
        { title: "Ongoing", url: "/dashboard/projects/ongoing" },
        { title: "Completed", url: "/dashboard/projects/completed" },
      ],
    },
    {
      title: "Resources",
      url: "/dashboard/resources",
      icon: BookOpen,
      items: [
        { title: "Roadmaps", url: "/dashboard/resources/roadmaps" },
        { title: "Tutorials", url: "/dashboard/resources/tutorials" },
        { title: "Notes", url: "/dashboard/resources/notes" },
      ],
    },
    {
      title: "Community",
      url: "/dashboard/community",
      icon: Users,
      items: [
        { title: "Members", url: "/dashboard/community/members" },
        { title: "Leaderboard", url: "/dashboard/community/leaderboard" },
      ],
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
      items: [],
    },
  ],
  projects: [
    {
      name: "Bug Factory ",
      url: "/dashboard/projects/bug-factory",
      icon: Bug,
    },
    {
      name: "Code Streak ",
      url: "/dashboard/streak",
      icon: Flame,
    },
    {
      name: "Mentor Connect ",
      url: "/dashboard/mentors",
      icon: GraduationCap,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
