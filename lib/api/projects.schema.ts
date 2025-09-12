// /lib/api/projects.schema.ts
import { z } from "zod";


export const CreateProjectInput = z.object({
name: z.string().min(1, "Name is required"),
});


export const UpdateProjectInput = z.object({
name: z.string().min(1).optional(),
status: z.enum(["draft", "processing", "ready", "error"]).optional(),
}).refine((v) => Object.keys(v).length > 0, { message: "No fields to update" });