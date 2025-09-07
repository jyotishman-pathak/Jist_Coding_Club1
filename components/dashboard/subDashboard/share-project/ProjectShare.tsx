"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  X,
  Send,
  Image as ImageIcon,
  MoreHorizontal,
  Bookmark,
  Share,
  Loader2,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

interface User {
  id: number;
  name: string;
  imageUrl?: string;
}

interface Comment {
  id: string;
  content: string;
  userId: number;
  user: User;
  createdAt: string;
}

interface Like {
  id: string;
  userId: number;
  projectId: string;
}

interface Post {
  id: string;
  content: string;
  images: string[];
  userId: number;
  user: User;
  comments: Comment[];
  likes: Like[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export default function ProjectShare() {
  const { data: session, status } = useSession();
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme, setTheme } = useTheme();

  // Get current user ID from session
  const currentUserId = session?.user?.id ? parseInt(session.user.id) : null;

  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/project-upload");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Like toggle
  const handleLike = async (projectId: string) => {
    if (!currentUserId) return;
    
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, userId: currentUserId }),
      });

      if (!res.ok) throw new Error("Failed to like post");

      // Optimistic update
      setPosts((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                likesCount: p.likes && p.likes.some((like) => like.userId === currentUserId)
                  ? p.likesCount - 1
                  : p.likesCount + 1,
                likes: p.likes && p.likes.some((like) => like.userId === currentUserId)
                  ? p.likes.filter((like) => like.userId !== currentUserId)
                  : [...(p.likes || []), { id: Date.now().toString(), userId: currentUserId, projectId }],
              }
            : p
        )
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  // Add comment
  const handleAddComment = async (projectId: string, content: string) => {
    if (!currentUserId) return;
    
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, userId: currentUserId, content }),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      const data = await res.json();

      setPosts((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                comments: [data, ...(p.comments || [])],
                commentsCount: (p.commentsCount || 0) + 1,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Comment error:", err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    setImages((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTextareaFocus = () => {
    setIsExpanded(true);
  };

  const handlePostSubmit = async () => {
    if (!postContent && images.length === 0) return;
    if (!currentUserId) {
      alert("You need to be logged in to post");
      return;
    }
    
    setPosting(true);

    try {
      const formData = new FormData();
      formData.append("content", postContent);
      formData.append("userId", currentUserId.toString());
      images.forEach((img) => formData.append("images", img));

      const res = await fetch("/api/project-upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create post");

      const newPost = await res.json();

      setPosts((prev) => [newPost, ...prev]);
      setPostContent("");
      setImages([]);
      setPreviewUrls([]);
      setIsExpanded(false);
    } catch (err) {
      console.error("Post create error:", err);
    } finally {
      setPosting(false);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postContent]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">ProjectShare</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            <Avatar className="h-8 w-8">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} />
              ) : (
                <AvatarFallback>
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 md:pb-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Share Prompt */}
          {!isExpanded && (
            <Card className="border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm bg-white dark:bg-black">
              <div
                className="flex items-center gap-3 p-4 cursor-text"
                onClick={handleTextareaFocus}
              >
                <Avatar className="h-10 w-10">
                  {session?.user?.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 text-gray-500 dark:text-gray-400">
                  Share your project updates...
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="h-9 w-9 rounded-full"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          )}

          {/* Posts */}
          {loading ? (
            <p className="text-center">Loading posts...</p>
          ) : (
            posts.map((post) => (
              <Card
                key={post.id}
                className="border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm bg-white dark:bg-black"
              >
                <CardHeader className="flex flex-row items-center justify-between gap-3 p-4 pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={post.user?.imageUrl || "/placeholder-user.jpg"}
                      />
                      <AvatarFallback>
                        {post.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{post.user?.name || "Unknown User"}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <p>@{post.user?.id || "unknown"}</p>
                        <span>•</span>
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>

                <CardContent className="space-y-3 p-4 pt-2">
                  <p>{post.content}</p>
                  {post.images && post.images.length > 0 && (
                    <Carousel className="w-full rounded-lg overflow-hidden">
                      <CarouselContent>
                        {post.images.map((img: string, i: number) => (
                          <CarouselItem key={i}>
                            <div className="aspect-video overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
                              <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {post.images.length > 1 && (
                        <>
                          <CarouselPrevious className="left-2 bg-white dark:bg-black" />
                          <CarouselNext className="right-2 bg-white dark:bg-black" />
                        </>
                      )}
                    </Carousel>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between text-sm p-4 pt-2 text-gray-600 dark:text-gray-400">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart
                      className="h-4 w-4"
                      fill={
                        post.likes && post.likes.some((like) => like.userId === currentUserId) ? "currentColor" : "none"
                      }
                    />{" "}
                    {post.likesCount || 0}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {post.commentsCount || 0}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share className="h-4 w-4" /> 0
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </CardFooter>

                {/* Comment Box */}
                <div className="px-4 pb-4">
                  <div className="flex gap-2">
                    <Input
                      id={`comment-${post.id}`}
                      type="text"
                      placeholder="Write a comment..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(post.id, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      onClick={() => {
                        const input = document.querySelector<HTMLInputElement>(
                          `#comment-${post.id}`
                        );
                        if (input && input.value.trim()) {
                          handleAddComment(post.id, input.value);
                          input.value = "";
                        }
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Show comments */}
                  {post.comments &&
                    post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="mt-2 flex items-start gap-2 text-sm"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={comment.user?.imageUrl || "/placeholder-user.jpg"}
                          />
                          <AvatarFallback>
                            {comment.user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{comment.user?.name || "Unknown User"}</p>
                          <p className="text-gray-600 dark:text-gray-400">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Dialog for creating post */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="sm:max-w-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <DialogTitle className="text-lg font-semibold">Create Post</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 rounded-full"
              disabled={posting}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Create a new post to share your project updates
          </DialogDescription>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                {session?.user?.image ? (
                  <AvatarImage src={session.user.image} />
                ) : (
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <Textarea
                ref={textareaRef}
                placeholder="What's your project about?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[100px] resize-none border-none focus-visible:ring-0 text-base p-0 bg-transparent"
                autoFocus
                disabled={posting}
              />
            </div>

            {previewUrls.length > 0 && (
              <div className="mt-3">
                <Carousel className="w-full">
                  <CarouselContent>
                    {previewUrls.map((url, i) => (
                      <CarouselItem key={i} className="basis-full md:basis-1/2">
                        <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
                          <img src={url} alt="" className="h-full w-full object-cover" />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-red-500/90 hover:bg-red-600"
                            onClick={() => removeImage(i)}
                            disabled={posting}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full h-9 w-9 p-0 sm:px-3"
                  disabled={posting}
                >
                  <ImageIcon className="h-4 w-4 ml-7" />
                  <span className="hidden sm:block ml-1">Add Photos</span>
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={posting}
                />
              </div>

              <Button
                size="sm"
                onClick={handlePostSubmit}
                disabled={(!postContent && images.length === 0) || posting || !currentUserId}
                className="rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {posting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}