"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function JoinWhatsApp() {
  const handleClick = () => {
    window.open("https://chat.whatsapp.com/EVIuab4MLoTEZriAihPZNk", "_blank");
    // ya phir agar same tab chahiye:
    // window.location.href = "https://chat.whatsapp.com/EVIuab4MLoTEZriAihPZNk";
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Join WhatsApp Group</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
             Wanna join our Coding Club WhatsApp group?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Stay updated with events, hackathons, and projects by being part of
            our official WhatsApp group. Click below to join and connect with
            fellow coders!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
