import { z } from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, "title is required").max(255),
    description: z.string(),
});

export const PatchIssueSchema = z.object({
    title: z.string().min(1, "title is required").max(255).optional(),
    description: z.string().optional(),
    assignedToUser: z.string().min(1).optional().nullable(),
});
