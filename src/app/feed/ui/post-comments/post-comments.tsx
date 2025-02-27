"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../lib/get-posts";
import { postCommentAction } from "./post-comment-action";
import { useMemo, useState } from "react";
import { Avatar } from "~/app/_components/avatar";
import { ReplyIcon } from "lucide-react";
import { Collapsible } from "~/components/ui/collapsible";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { getCommentAction } from "./get-comments-action";
import { cn } from "~/lib/utils";

function Reply({
  open,
  setOpen,
  post,
  parentCommentId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  post: Post;
  parentCommentId?: string;
}) {
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["add-comment", post.id, parentCommentId, post.id],
    mutationFn: async (comment: string) => {
      const formData = new FormData();
      if (parentCommentId) {
        formData.append("parentId", parentCommentId);
      }
      formData.append("content", comment);
      // TODO: Fix when cookie
      formData.append("userId", post.user_id);
      formData.append("postId", post.id);

      await postCommentAction(formData);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["comments", post.id],
      });
      setOpen(false);
      setText("");
    },
  });

  return (
    <Collapsible className="space-y-2" open={open}>
      <div
        className={cn(
          parentCommentId && "ml-12",
          "flex flex-row items-center space-x-4",
        )}
      >
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full"
        />
        <Button
          className="rounded-xl px-4 py-2 text-sm"
          disabled={isPending}
          onClick={() => mutateAsync(text)}
        >
          Send
        </Button>
      </div>
    </Collapsible>
  );
}

type Comment = Post["comments"][number] & {
  nested?: Comment[];
};

function Comment({ post, comment }: { post: Post; comment: Comment }) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center space-x-4">
        <div className="flex flex-row items-center space-x-2">
          <div className="h-full w-1 grow bg-red-500" />
          <Avatar
            name={comment.user.user_name}
            src={comment.user.avatar_url ?? undefined}
            alt="avatar"
            className="flex-shrink-0 rounded-full"
            size={32}
          />
          <p className="space-x-1 text-justify text-xs [word-break:break-word]">
            <span className="float-left flex flex-row space-x-2">
              <span className="whitespace-nowrap font-semibold">
                {comment.user.user_name}:
              </span>
            </span>
            <span>{comment.content}</span>
          </p>
        </div>
        <ReplyIcon
          className="flex-shrink-0 cursor-pointer rounded-xl bg-secondary p-2 opacity-25 hover:opacity-100"
          width={28}
          height={28}
          onClick={() => setIsReplying(!isReplying)}
        />
      </div>
      <Reply
        open={isReplying}
        setOpen={setIsReplying}
        post={post}
        parentCommentId={comment.id}
      />
    </div>
  );
}

function Comments({ post, comments }: { post: Post; comments: Comment[] }) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-2">
          <Comment post={post} comment={comment} />
          {comment.nested && (
            <div className="space-y-2 pl-9">
              <Comments post={post} comments={comment.nested} />
            </div>
          )}
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
    .filter(
      (comment) =>
        (!parent_id && !comment.parent_id) || comment.parent_id === parent_id,
    )
    .map((comment) => {
      return {
        ...comment,
        nested: createNestedComments(comments, comment.id),
      };
    });
}

export function PostComments({ post }: { post: Post }) {
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => {
      const formData = new FormData();
      formData.append("postId", post.id);

      return getCommentAction(formData);
    },
    initialData: post.comments,
  });

  const nested = useMemo(() => createNestedComments(data), [data]);

  return (
    <div className="w-full space-y-2">
      <div className="flex w-full items-center justify-between space-x-4">
        <Reply open={open} setOpen={setOpen} post={post} />
        <ReplyIcon
          className="flex-shrink-0 cursor-pointer rounded-xl bg-secondary p-2 opacity-25 hover:opacity-100"
          width={28}
          height={28}
          onClick={() => setOpen(!open)}
        />
      </div>
      <Comments post={post} comments={nested} />
    </div>
  );
}
