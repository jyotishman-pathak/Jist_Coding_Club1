"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { FileUpload } from "../ui/file-upload";
import { toast } from "sonner";
import axios from "axios";

const ProfileCard = () => {
  const { data: session, status } = useSession();

  // Profile states
  const [aboutData, setAboutData] = useState({
    name: "",
    email: "",
    imageUrl: "",
  });
  const [extraData, setExtraData] = useState({
    githubUrl: "",
    linkedIn: "",
    instagram: "",
  });
  const [initialAboutData, setInitialAboutData] = useState(aboutData);
  const [initialExtraData, setInitialExtraData] = useState(extraData);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      if (status !== "authenticated" || !session?.user?.id) return;
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/profile?userId=${session.user.id}`);
        const data = response.data;

        const newAboutData = {
          name: data.name || session.user.name || "",
          email: data.email || session.user.email || "",
          imageUrl: data.imageUrl || "",
        };
        const newExtraData = {
          githubUrl: data.githubUrl || "",
          linkedIn: data.linkedIn || "",
          instagram: data.instagram || "",
        };

        setAboutData(newAboutData);
        setExtraData(newExtraData);
        setInitialAboutData(newAboutData);
        setInitialExtraData(newExtraData);
        if (data.imageUrl) {
          setAvatarPreview(`${data.imageUrl}?t=${Date.now()}`);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        toast.error("Failed to fetch profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [session?.user?.id, status]);

  // Handle file upload
  const handleFileUpload = async (files: File[]) => {
    if (status !== "authenticated" || !session?.user?.id) {
      toast.error("Please sign in to upload an image");
      return;
    }

    if (files.length > 0) {
      const file = files[0];
      const localPreview = URL.createObjectURL(file);
      setAvatarPreview(localPreview);
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", session.user.id.toString());

      try {
        const res = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const { url } = res.data;
        setAvatarPreview(`${url}?t=${Date.now()}`);
        setAboutData((prev) => ({ ...prev, imageUrl: url }));
        toast.success("Profile image updated!");
      } catch (err) {
        console.error("Upload failed", err);
        toast.error("Failed to upload image");
        setAvatarPreview(aboutData.imageUrl || null);
      } finally {
        URL.revokeObjectURL(localPreview);
        setIsLoading(false);
      }
    }
  };

  // Memoized unchanged checks
  const isAboutUnchanged = useMemo(
    () =>
      aboutData.name === initialAboutData.name &&
      aboutData.email === initialAboutData.email &&
      aboutData.imageUrl === initialAboutData.imageUrl,
    [aboutData, initialAboutData]
  );

  const isExtraUnchanged = useMemo(
    () =>
      extraData.githubUrl === initialExtraData.githubUrl &&
      extraData.linkedIn === initialExtraData.linkedIn &&
      extraData.instagram === initialExtraData.instagram,
    [extraData, initialExtraData]
  );

  // Submit profile changes
  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "authenticated" || !session?.user?.id) return;
    try {
      setIsLoading(true);
      await axios.put("/api/update-profile", {
        userId: session.user.id,
        name: aboutData.name,
        email: aboutData.email,
        imageUrl: aboutData.imageUrl,
      });
      setInitialAboutData(aboutData);
      toast.success("Profile updated");
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit social links
  const handleExtraSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "authenticated" || !session?.user?.id) return;
    try {
      setIsLoading(true);
      await axios.put("/api/update-profile", {
        userId: session.user.id,
        githubUrl: extraData.githubUrl,
        linkedIn: extraData.linkedIn,
        instagram: extraData.instagram,
      });
      setInitialExtraData(extraData);
      toast.success("Social links updated");
    } catch (err) {
      console.error("Update social links error:", err);
      toast.error("Failed to update social links");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r bg-muted/30 p-4 md:p-6 flex flex-col items-center">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4 w-full">
            <Skeleton className="h-20 w-20 md:h-28 md:w-28 rounded-full" />
            <Skeleton className="h-5 w-32 md:h-6 md:w-40" />
            <Skeleton className="h-4 w-24 md:h-4 md:w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <>
            <Avatar className="h-20 w-20 md:h-28 md:w-28 mb-4 border-2 border-primary shadow-md">
              <AvatarImage
                src={avatarPreview || aboutData.imageUrl || "/placeholder.png"}
              />
              <AvatarFallback>{aboutData.name ? aboutData.name[0] : "U"}</AvatarFallback>
            </Avatar>
            <h2 className="font-semibold text-base md:text-lg text-center">{aboutData.name || "User"}</h2>
            <p className="text-xs md:text-sm text-muted-foreground text-center">{aboutData.email}</p>
            <div className="mt-4 w-full">
              <FileUpload onChange={handleFileUpload} />
            </div>
          </>
        )}
      </aside>

      <main className="flex-1 p-4 md:p-10">
        <Card className="w-full shadow-sm border">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-[16rem] mb-6">
                <TabsTrigger value="about" className="text-xs md:text-sm">Profile</TabsTrigger>
                <TabsTrigger value="additional" className="text-xs md:text-sm">Social Links</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                {isLoading ? (
                  <div className="space-y-6 w-full max-w-md mx-auto">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 md:w-24" />
                      <Skeleton className="h-9 md:h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 md:w-24" />
                      <Skeleton className="h-9 md:h-10 w-full" />
                    </div>
                    <Skeleton className="h-9 md:h-10 w-24 md:w-32" />
                  </div>
                ) : (
                  <form onSubmit={handleAboutSubmit} className="space-y-6 w-full max-w-md mx-auto">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs md:text-sm">Name</Label>
                      <Input
                        id="name"
                        value={aboutData.name}
                        onChange={(e) =>
                          setAboutData({ ...aboutData, name: e.target.value })
                        }
                        placeholder="Your full name"
                        disabled={isLoading}
                        className="text-xs md:text-sm h-9 md:h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
                      <Input
                        id="email"
                        value={aboutData.email}
                        onChange={(e) =>
                          setAboutData({ ...aboutData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        disabled={isLoading}
                        className="text-xs md:text-sm h-9 md:h-10"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isAboutUnchanged || isLoading}
                      className="h-9 md:h-10 text-xs md:text-sm"
                    >
                      Save Changes
                    </Button>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="additional">
                {isLoading ? (
                  <div className="space-y-6 w-full max-w-md mx-auto">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 md:w-24" />
                      <Skeleton className="h-9 md:h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 md:w-24" />
                      <Skeleton className="h-9 md:h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20 md:w-24" />
                      <Skeleton className="h-9 md:h-10 w-full" />
                    </div>
                    <Skeleton className="h-9 md:h-10 w-24 md:w-32" />
                  </div>
                ) : (
                  <form onSubmit={handleExtraSubmit} className="space-y-6 w-full max-w-md mx-auto">
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl" className="text-xs md:text-sm">GitHub</Label>
                      <Input
                        id="githubUrl"
                        value={extraData.githubUrl}
                        onChange={(e) =>
                          setExtraData({ ...extraData, githubUrl: e.target.value })
                        }
                        placeholder="https://github.com/username"
                        disabled={isLoading}
                        className="text-xs md:text-sm h-9 md:h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedIn" className="text-xs md:text-sm">LinkedIn</Label>
                      <Input
                        id="linkedIn"
                        value={extraData.linkedIn}
                        onChange={(e) =>
                          setExtraData({ ...extraData, linkedIn: e.target.value })
                        }
                        placeholder="https://linkedin.com/in/username"
                        disabled={isLoading}
                        className="text-xs md:text-sm h-9 md:h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-xs md:text-sm">Instagram</Label>
                      <Input
                        id="instagram"
                        value={extraData.instagram}
                        onChange={(e) =>
                          setExtraData({ ...extraData, instagram: e.target.value })
                        }
                        placeholder="https://instagram.com/username"
                        disabled={isLoading}
                        className="text-xs md:text-sm h-9 md:h-10"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isExtraUnchanged || isLoading}
                      className="h-9 md:h-10 text-xs md:text-sm"
                    >
                      Update Links
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileCard;