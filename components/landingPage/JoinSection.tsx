'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Users, Lightbulb, Trophy, Calendar, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';

export default function JoinSection() {
    const session = useSession()
    const benefits = [
        {
            icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
            title: "Skill Development",
            description: "Learn cutting-edge technologies through hands-on workshops and mentorship programs."
        },
        {
            icon: <Users className="h-8 w-8 text-blue-500" />,
            title: "Professional Network",
            description: "Connect with industry professionals, alumni, and like-minded peers in tech."
        },
        {
            icon: <Trophy className="h-8 w-8 text-purple-500" />,
            title: "Career Opportunities",
            description: "Access to internships, job referrals, and exclusive recruiting events with top companies."
        },
        {
            icon: <Calendar className="h-8 w-8 text-green-500" />,
            title: "Exclusive Events",
            description: "Priority access to hackathons, tech talks, and industry networking sessions."
        }
    ];

    return (
        <section
            id="join"
            className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Community</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Become part of our vibrant coding community and accelerate your journey in tech.
                        Connect, learn, and build amazing things together.
                    </p>
                   
                </div>

                {/* Benefits */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold mb-8 text-center">Why Join Jist Coding Club?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/10 backdrop-blur-sm"
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon}
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                                    <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

               
                <div className='flex justify-center mb-12'>
              
{session.status === "unauthenticated" ?
<Link href="/auth/signup">
               <button 
                      
                      className="relative inline-flex h-14 w-52 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] blur-md" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 text-lg font-semibold text-white backdrop-blur-3xl">
    Join Now
  </span>
</button>
              </Link>:
              
              <Link href="/auth/signup">
               <button 
                      
                      className="relative inline-flex h-14 w-52 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] blur-md" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 text-lg font-semibold text-white backdrop-blur-3xl">
     Dashboard
  </span>
</button>
              </Link>
              
              
              
              } 

                </div>
            </div>
        </section>
    );
}
