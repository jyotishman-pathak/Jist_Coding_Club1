"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const session = useSession();

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center bg-background"
    >
      {/* Background subtle grid */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:60px_60px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"
        )}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-widest text-sm md:text-base font-medium text-muted-foreground mb-6"
        >
          Student Developer Community
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-violet-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent"
        >
          JIST Coding Club
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
        >
          Learn. Build. Innovate.  
          From <span className="font-semibold text-foreground">Web Dev </span> 
          to <span className="font-semibold text-foreground">AI/ML</span>, 
          we push the limits of technology together 🚀
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-5"
        >
          {session.status === "unauthenticated" ? (
            <>
              <Button asChild size="lg" className="text-lg px-8 py-6 font-semibold">
                <a href="/auth/sign-up">Join the Club</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 font-semibold"
              >
                <a href="#about">Learn More</a>
              </Button>
            </>
          ) : (
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 font-semibold"
            >
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
