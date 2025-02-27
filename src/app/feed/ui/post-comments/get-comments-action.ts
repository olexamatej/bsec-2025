"use server";

import { db } from "~/server/db";
import { getCommentsSchema } from "./get-comments-schema";
import { comments } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getCommentAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const result = getCommentsSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid form data");
  }

  return db.query.comments.findMany({
    with: {
      user: true,
    },
    where: eq(comments.post_id, result.data.postId),
    orderBy: [desc(comments.createdAt)],
  });
}
