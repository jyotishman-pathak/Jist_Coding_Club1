import axios from "axios";

export enum Occuring {
  UPCOMMING,
  PAST,
  HACKTHONS,
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

export async function fetchEvents(): Promise<Events[]> {
  try {
    const res = await axios.get<Events[]>("/api/events");
    return res.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
