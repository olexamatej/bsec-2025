"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../lib/get-posts";
import { postCommentAction } from "./post-comment-action";
import { useMemo } from "react";

type Comment = Post["comments"][number] & {
  nested?: Comment[];
};

function Comment({ comment }: { comment: Comment }) {
  return <div>{comment.content}</div>;
}

function Comments({ post, comments }: { post: Post; comments: Comment[] }) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-comment", post.id],
    mutationFn: async (comment: string, parent_id?: string) => {
      const formData = new FormData();
      if (parent_id) {
        formData.append("parent_id", parent_id);
      }
      formData.append("content", comment);
      // TODO: Fix when cookie
      formData.append("user_id", post.user_id);
      formData.append("post_id", post.id);

      await postCommentAction(formData);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["comments", post.id],
      });
    },
  });

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} />
          {comment.nested && <Comments post={post} comments={comment.nested} />}
        </div>
      ))}
    </>
  );
}

// Recurisvely create a possibly infinitely deep tree from an array of comments
function createNestedComments(
  comments: Comment[],
  parent_id?: string,
): Comment[] {
  return comments
    .filter((comment) => comment.parent_id === parent_id)
    .map((comment) => {
      return {
        ...comment,
        nested: createNestedComments(comments, comment.id),
      };
    });
}

export function PostComments({ post }: { post: Post }) {
  const { data } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => {
      return post.comments;
    },
    initialData: post.comments,
  });

  const nested = useMemo(() => createNestedComments(data), [data]);

  return (
    <div className="space-y-2">
      <Comments post={post} comments={nested} />
    </div>
  );
}
