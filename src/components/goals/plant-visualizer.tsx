import type React from "react";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { GoalCard } from "./goal-card";
import { type Goal } from "~/server/db/schema";
import { redirect } from "next/navigation";

const progress_to_stage = (progress: number): string => {
  const path = "/plant-growth/kytka{index}.svg";

  if (progress < 20) {
    return path.replace("{index}", "1");
  } else if (progress < 40) {
    return path.replace("{index}", "2");
  } else if (progress < 60) {
    return path.replace("{index}", "3");
  } else if (progress < 80) {
    return path.replace("{index}", "4");
  } else {
    return path.replace("{index}", "5");
  }
};

export function PlantVisualizer({
  style,
  goal,
}: {
  style: React.CSSProperties;
  goal: Goal;
}) {
  const progress = (goal.amount / goal.target) * 100;
  const imagePath = progress_to_stage(progress);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="absolute cursor-pointer"
          style={style}
          onClick={() => redirect(`/goals/${goal.id}`)}
        >
          <Image
            src={imagePath}
            alt="MLEMLEMFL"
            width={80}
            height={80}
            className="animate-sway"
          />
          <p className="-mb-2 text-center text-lg font-bold text-black">
            {goal.name}
          </p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-160">
        <GoalCard goal={goal} />
      </HoverCardContent>
    </HoverCard>
  );
}
