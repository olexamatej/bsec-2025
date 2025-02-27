import { z } from "zod";

export const postCommentSchema = z.object({
  postId: z.string(),
  parentId: z.string().optional(),
  userId: z.string(),
  content: z.string(),
});

export type PostCommentForm = z.infer<typeof postCommentSchema>;
