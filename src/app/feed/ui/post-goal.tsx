import { Card, CardContent } from "~/components/ui/card";
import type { Post } from "../lib/get-posts";

export function PostGoal({ goal }: { goal: NonNullable<Post["goal"]> }) {
  return (
    <Card>
      <CardContent className="pt-6">{goal.name}</CardContent>
    </Card>
  );
}
