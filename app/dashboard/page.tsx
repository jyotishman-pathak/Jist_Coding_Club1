"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import {
  Card, CardHeader, CardContent, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Code2, Calendar, Users, Trophy, Activity as ActivityIcon,
  Github, ExternalLink, Flame, Rocket, Plus,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

import {
  Events, getLeaderboardScore, Occuring,
  LeaderboardEntry, StatsResponse
} from "@/lib/backend/fetch";

// --------- Static Data (dummy) -------------
const activityData = [
  { day: "Aug", commits: 2 },
  { day: "Sep", commits: 0 },
  { day: "Oct", commits: 0 },
  { day: "Nov", commits: 0 },
  { day: "Dec", commits: 0 },
  { day: "Jan", commits: 0 },
  { day: "Feb", commits: 0 },
];

const projectProgress = [
  { name: "AI Chatbot", progress: 72 },
  { name: "Hackathon Site", progress: 95 },
  { name: "Code Streak App", progress: 38 },
  { name: "Mentor Connect", progress: 54 },
];

const recentActivity = [
  { who: "Saptarisi", what: "pushed to mentor-connect", when: "2h ago" },
  { who: "Rian", what: "opened PR #42 (bugfix)", when: "6h ago" },
  { who: "Jyotishman", what: "created repo bug-factory", when: "1d ago" },
  { who: "Hridayam", what: "commented on issue #18", when: "2d ago" },
];

const projectStatusPie = [
  { name: "Active", value: 7 },
  { name: "Paused", value: 2 },
  { name: "Completed", value: 3 },
];

const resources = [
  { name: "Frontend Roadmap", type: "Guide", href: "#" },
  { name: "Git Commands Cheatsheet", type: "Doc", href: "#" },
  { name: "API Templates", type: "Repo", href: "#" },
  { name: "System Design Notes", type: "Notes", href: "#" },
];

// -------------------------------------
export default function Page() {
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
  const [score, setScore] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get<Events[]>("/api/events");
        setUpcomingEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get<StatsResponse>("/api/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    getLeaderboardScore().then(setScore).catch(console.error);
    fetchEvent();
    fetchStats();
  }, []);

  // KPIs from stats
  const kpis = [
    { title: "Projects", value: stats?.stats.projects ?? 0, sub: "no updates this month", icon: Code2 },
    { title: "Events Attended", value: stats?.stats.eventsAttended ?? 0, sub: "so far", icon: Calendar },
    { title: "Members", value: stats?.stats.members ?? 0, sub: "active", icon: Users },
    { title: "Streak (max)", value: 2, sub: "🔥 club record", icon: Flame },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">JIST Coding Club · Web Dev Squad</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Github className="h-4 w-4" /> GitHub
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.title} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-medium">
                <k.icon className="h-4 w-4" /> {k.title}
              </CardTitle>
              <CardDescription>{k.sub}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{k.value}</div>
            </CardContent>
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10" />
          </Card>
        ))}
      </div>

      {/* Middle: Charts + Events */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ActivityIcon className="h-5 w-5" /> Weekly Activity
            </CardTitle>
            <CardDescription>Commits pushed by club members (last 7 days)</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ left: 12, right: 12 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="currentColor" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="currentColor" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} width={28} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                <Area type="monotone" dataKey="commits" strokeWidth={2} stroke="currentColor" fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />  Events
            </CardTitle>
            <CardDescription>This drops at the club</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 pr-3">
              <div className="space-y-4">
                {upcomingEvents.map((e) => (
                  <div key={e.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{e.projectTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(e.createdAt).toLocaleDateString()} · {e.technologies?.join(", ") || "N/A"}
                        </div>
                      </div>
                      <Badge variant="secondary">{Occuring[e.occuring]}</Badge>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="h-8">Details</Button>
                      <Button size="sm" className="h-8">RSVP</Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Lower Grid: Projects + Leaderboard + Resources */}
      <div className="grid gap-4 xl:grid-cols-3">
        {/* Projects & Progress */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5" /> Active Projects</CardTitle>
                <CardDescription>Ongoing initiatives by the squad</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-2"><ExternalLink className="h-4 w-4" /> View All</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {projectProgress.map((p) => (
                <div key={p.name} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-muted-foreground">Sprint · v1.0</div>
                    </div>
                    <Badge variant={p.progress > 70 ? "default" : "secondary"}>{p.progress}%</Badge>
                  </div>
                  <div className="mt-3">
                    <Progress value={p.progress} />
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex -space-x-2">
                      {["AV","SR","RS"].map((x,i)=> (
                        <Avatar key={i} className="h-6 w-6 border">
                          <AvatarFallback>{x}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span>3 contributors</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity Table */}
            <div className="rounded-lg border">
              <div className="flex items-center justify-between p-4">
                <div className="font-semibold">Recent Activity</div>
                <Badge variant="secondary">Public</Badge>
              </div>
              <Separator />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Update</TableHead>
                    <TableHead className="text-right">When</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{r.who}</TableCell>
                      <TableCell className="flex items-center gap-2"><Github className="h-4 w-4" /> {r.what}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{r.when}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right column: Leaderboard + Resources + Project Status */}
        <div className="space-y-4">
          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" /> Leaderboard
              </CardTitle>
              <CardDescription>Weekly points & streak</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {score.map((m, i) => (
                  <div key={m.user.id} className="flex items-center justify-between rounded-md border p-3">
                    {/* Left side */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {m.user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium leading-none">
                          {i + 1}. {m.user.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Hackathons: {m.hackathon}, Quiz: {m.quiz}
                        </div>
                      </div>
                    </div>

                    {/* Right side */}
                    <Badge>{m.totalPoints}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Status Pie */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
              <CardDescription>Active vs Paused vs Completed</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={projectStatusPie} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>
                    {projectStatusPie.map((_, idx) => (
                      <Cell key={idx} fill="currentColor" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Resources</CardTitle>
              <CardDescription>Docs, templates & repos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resources.map((r) => (
                  <a key={r.name} href={r.href} className="flex items-center justify-between rounded-md border p-3 hover:bg-accent">
                    <div>
                      <div className="font-medium leading-none">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.type}</div>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
