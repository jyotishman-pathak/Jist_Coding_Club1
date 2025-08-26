import axios from "axios";

// ---------- Events ----------
export enum Occuring {
  UPCOMMING = "UPCOMMING",
  PAST = "PAST",
  HACKTHONS = "HACKTHONS",
}

export interface Events {
  id: number;
  projectTitle: string;
  projectDescription: string;
  photo?: string;
  technologies?: string[];
  occuring: Occuring;
  createdAt: string;
}

// ✅ fetch all events
export async function fetchEvents(): Promise<Events[]> {
  try {
    const res = await axios.get<Events[]>("/api/events");
    return res.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

// ✅ fetch only upcoming events
export async function fetchUpcomingEvents(): Promise<Events[]> {
  try {
    const res = await axios.get<Events[]>("/api/events");
    return res.data.filter((e) => e.occuring === Occuring.UPCOMMING);
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

// ✅ fetch only past events
export async function fetchPastEvents(): Promise<Events[]> {
  try {
    const res = await axios.get<Events[]>("/api/events");
    return res.data.filter((e) => e.occuring === Occuring.PAST);
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
}

// ✅ fetch only hackthons
export async function fetchHackathons(): Promise<Events[]> {
  try {
    const res = await axios.get<Events[]>("/api/events");
    return res.data.filter((e) => e.occuring === Occuring.HACKTHONS);
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    return [];
  }
}

// ---------- Leaderboard ----------
export interface LeaderboardUser {
  id: number;
  name: string;
  email: string;
  Department: string;
  ProgrammingExperience: number;
  Interest: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  id: number;
  userId: number;
  hackathon: number;
  workshop: number;
  quiz: number;
  commits: number;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
  user: LeaderboardUser;
}

export async function getLeaderboardScore(): Promise<LeaderboardEntry[]> {
  try {
    const res = await axios.get<LeaderboardEntry[]>("/api/leaderboard");
    if (res.status !== 200) {
      throw new Error("Failed to fetch leaderboard");
    }
    return res.data;
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    throw err;
  }
}

// ---------- Projects ----------
export interface Project {
  id: number;
  projectTitle: string;
  projectDescription: string;
  githubUrl?: string;
  occuring: ProjectOccurence;  // 👈 status ke jagah occuring
  createdAt: string;
}

export enum ProjectOccurence {
 
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

export interface ActiveProjects {
  id: number;
  createdAt: Date;
  projectTitle: string;
  projectDescription: string;
  occuring: ProjectOccurence;
  githubUrl?: string;
  progress: number;
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await axios.get<Project[]>("/api/projects");
    return res.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function fetchActiveProject(): Promise<ActiveProjects> {
  try {
    const res = await axios.get<ActiveProjects>("/api/active-projects");
    return res.data;
  } catch (error) {
    console.log(error, "error fetching the active projects");
    throw error;
  }
}

// ---------- Stats ----------
export interface StatsResponse {
  stats: {
    projects: number;
    eventsAttended: number;
    members: number;
    contributions: {
      hackathon: number | null;
      workshop: number | null;
      quiz: number | null;
      commits: number | null;
      totalPoints: number | null;
    };
  };
}

export async function fetchStats(): Promise<StatsResponse> {
  try {
    const res = await axios.get<StatsResponse>("/api/stats");
    return res.data;
  } catch (error) {
    console.log(error, "error fetching the stats history");
    throw error;
  }
}

export interface MonthlyStats {
  month: string;
  activity: string;
}

export async function Activity(): Promise<MonthlyStats> {
  try {
    const res = await axios.get<MonthlyStats>("/api/activity");
    return res.data;
  } catch (error) {
    console.log(error, "error fetching the activity history");
    throw error;
  }
}
