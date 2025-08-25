"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LeaderboardEntry {
  id: number;
  userId: number;
  user: User;
  hackathon: number;
  workshop: number;
  quiz: number;
  commits: number;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
}

const Leaderboard = () => {
  const [score, setScore] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get<LeaderboardEntry[]>("/api/leaderboard");
        setScore(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="shadow-xl border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Trophy className="h-6 w-6 text-yellow-500" /> Coding Club Leaderboard
          </CardTitle>
          <CardDescription>
            Track points earned from Hackathons, Workshops, Quizzes, and Commits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {score
              .sort((a, b) => b.totalPoints - a.totalPoints) // sorting by points
              .map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition"
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {m.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">
                        {i + 1}. {m.user.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Hackathons: {m.hackathon} | Workshops: {m.workshop} | Quiz: {m.quiz} | Commits: {m.commits}
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <Badge className="px-4 py-1 text-base font-semibold">
                    {m.totalPoints} pts
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
