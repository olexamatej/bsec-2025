import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Post } from "../lib/get-posts";
import { Avatar } from "~/app/_components/avatar";
import { PostGoal } from "./post-goal";
import { PostTransaction } from "./post-transaction";
import { formatDistanceToNow } from "date-fns";
import { PostComments } from "./post-comments/post-comments";

export function Post({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              name={post.user.display_name}
              src={post.user.avatar_url ?? undefined}
              alt={post.user.display_name}
            />
            <span>{post.user.display_name}</span>
          </div>
          <div>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <span>{post.content}</span>
        {post.goal && <PostGoal goal={post.goal} />}
        {post.transaction && <PostTransaction transaction={post.transaction} />}
      </CardContent>
      <CardFooter>
        <PostComments post={post} />
      </CardFooter>
    </Card>
  );
}
