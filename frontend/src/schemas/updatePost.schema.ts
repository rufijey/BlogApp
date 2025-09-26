import {z} from "zod";

export const updatePostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(5),
});

export type updatePostFormValues = z.infer<typeof updatePostSchema>;
