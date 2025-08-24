import z from "zod"


export const eventSchema = z.object({
    projectTitle : z.string().min(4, "Title is required"),
     projectDescription: z.string().min(1, "description is required"),
     instructor: z.string().min(1, "Instructor is required"),
  photo: z.string(),
   occuring: z.enum(["UPCOMMING", "PAST", "HACKTHONS"]),
   technologies: z.array(z.string()).optional(),
})


export const projectSchema = z.object({
  projectTitle: z.string().min(4, "Minimum 4 characters required"),
  projectDescription: z.string().min(1, "Description is required"),
  githubUrl: z.string().url().optional(),
});