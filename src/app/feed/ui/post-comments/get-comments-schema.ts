import { z } from "zod";

export const getCommentsSchema = z.object({
  postId: z.string(),
});
