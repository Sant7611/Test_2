import z from "zod";

export const formSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(50, "Title must be less than 50 characters"),
    body: z.string().min(10, "Body must be at least 10 characters").max(200, "Body must be less than 200 characters"),
});

export type FormData = z.infer<typeof formSchema>;