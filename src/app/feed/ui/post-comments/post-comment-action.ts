"use server";

import { db } from "~/server/db";
import { comments } from "~/server/db/schema";
import { postCommentSchema } from "./post-comment-schema";

export async function postCommentAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const result = postCommentSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid form data");
  }

  await db.insert(comments).values({
    parent_id: result.data.parentId,
    content: result.data.content,
    user_id: result.data.userId,
    post_id: result.data.postId,
  });

  return;
}
