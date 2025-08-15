'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, Lightbulb, Trophy, Calendar, ArrowRight } from 'lucide-react';

export default function JoinSection() {
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

                {/* Registration Form */}
                <div>
                    <Card className="max-w-2xl mx-auto border-0 shadow-2xl bg-white text-gray-900">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-3xl font-bold">Quick Registration</CardTitle>
                            <p className="text-gray-600">Join our community in less than 2 minutes</p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="Enter your first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Enter your last name" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="your.email@university.edu" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="year">Academic Year</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="freshman">Freshman</SelectItem>
                                            <SelectItem value="sophomore">Sophomore</SelectItem>
                                            <SelectItem value="junior">Junior</SelectItem>
                                            <SelectItem value="senior">Senior</SelectItem>
                                            <SelectItem value="graduate">Graduate Student</SelectItem>
                                            <SelectItem value="alumni">Alumni</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="major">Major/Field</Label>
                                    <Input id="major" placeholder="Computer Science" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience">Programming Experience</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your experience level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                        <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                                        <SelectItem value="professional">Professional Developer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="interests">What interests you most? (Optional)</Label>
                                <Textarea
                                    id="interests"
                                    placeholder="Web development, mobile apps, AI/ML, data science, cybersecurity, etc."
                                    rows={3}
                                />
                            </div>

                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3">
                                Join Jist Coding Club
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <p className="text-center text-sm text-gray-500">
                                By joining, you agree to our community guidelines and code of conduct.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
