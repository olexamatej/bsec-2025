"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Post } from "../../lib/get-posts";

export function PostComments({ post }: { post: Post }) {
  const { data, refetch } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => {
      return post.comments;
    },
    initialData: post.comments,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["add-comment", post.id],
    mutationFn: async (comment: string) => {
      await 
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  return <div>Comments</div>;
}
