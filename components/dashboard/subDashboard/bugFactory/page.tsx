"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Bug {
  id: number;
  title: string;
  description: string;
  fix: string;
}

const bugs: Bug[] = [
  {
    id: 1,
    title: "Navbar not responsive",
    description: "On smaller screens, the navbar items overflow and break layout.",
    fix: "Use flex-wrap with Tailwind (`flex-wrap`), or implement a hamburger menu using `hidden md:flex` classes for responsiveness.",
  },
  {
    id: 2,
    title: "Image not centered",
    description: "Large images appear stuck to the left side on bigger displays.",
    fix: "Wrap the image with `flex justify-center items-center` or apply `mx-auto` to center it properly.",
  },
  {
    id: 3,
    title: "Button too small",
    description: "Button text overflows and looks cramped on mobile view.",
    fix: "Increase padding using `px-6 py-3`, and apply `min-w-[120px]` so it adapts across devices.",
  },
];

const BugFactory = () => {
  const [showFix, setShowFix] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {bugs.map((bug) => (
        <Card
          key={bug.id}
          className="rounded-2xl shadow-xl border p-6 min-h-[220px] flex flex-col justify-between"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold">🐞 {bug.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">{bug.description}</p>
            <Button
              variant="outline"
              size="lg"
              className="mt-2"
              onClick={() => setShowFix(showFix === bug.id ? null : bug.id)}
            >
              {showFix === bug.id ? "Hide Fix" : "Show Fix"}
            </Button>
            {showFix === bug.id && (
              <div className="mt-4 p-4 rounded-lg bg-muted border text-base leading-relaxed">
                <p className="font-medium">✅ Fix:</p>
                <p>{bug.fix}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BugFactory;
