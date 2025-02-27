import { Card } from "~/components/ui/card";
import type { Post } from "../lib/get-posts";

export function PostGoal({ goal }: { goal: NonNullable<Post["goal"]> }) {
  return <Card>{goal.name}</Card>;
}
