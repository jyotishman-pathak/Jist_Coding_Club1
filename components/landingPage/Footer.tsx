'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code2, Github, MessageSquare, Instagram, Users, Mail, ChevronUp } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Projects", href: "#projects" },
    { name: "Team", href: "#team" },
    { name: "Join", href: "#join" },
    { name: "Resources", href: "#resources" },
    { name: "Contact", href: "#contact" }
  ];

  const resources = [
    { name: "Learning Materials", href: "#" },
    { name: "Project Guidelines", href: "#" },
    { name: "Code of Conduct", href: "#" },
    { name: "Meeting Minutes", href: "#" },
    { name: "Alumni Network", href: "#" }
  ];

  const socialLinks = [
    { icon: <MessageSquare className="h-5 w-5" />, href: "#", label: "Discord" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Users className="h-5 w-5" />, href: "#", label: "LinkedIn" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Jist Coding Club</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering the next generation of developers through collaborative learning, 
              hands-on projects, and industry connections.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-purple-600 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get weekly updates on events, opportunities, and club news.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Jist Coding Club. All rights reserved. | 
              <a href="#" className="hover:text-white ml-2">Privacy Policy</a> | 
              <a href="#" className="hover:text-white ml-2">Terms of Service</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Made by JIST coding club</span>
              <button
                onClick={scrollToTop}
                className="p-2 bg-gray-700 rounded-lg hover:bg-purple-600 transition-colors"
                aria-label="Scroll to top"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span>JistCodingClub@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>JIST Jorhat, Assam</span>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}