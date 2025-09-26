import {z} from "zod";

export const createCommentSchema = z.object({
    author: z.string().min(2),
    content: z.string().min(3),
});

export type createCommentFormValues = z.infer<typeof createCommentSchema>;
