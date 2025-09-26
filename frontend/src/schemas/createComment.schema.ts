import {z} from "zod";

export const createCommentSchema = z.object({
    content: z.string().min(3),
});

export type createCommentFormValues = z.infer<typeof createCommentSchema>;
