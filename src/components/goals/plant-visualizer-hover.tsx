"use client";

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
import { Plus } from "lucide-react";

const progress_to_stage = (progress: number): string => {
  const path = "/plant-growth/kytka{index}.svg";

  if (progress === -1) {
    return "/plant-growth/kytka_test.svg";
  } else if (progress < 20) {
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

export function PlantVisualizerHover({
  style,
  goal,
  show_name = false,
  height = 80,
  width = 80,
}: {
  style: React.CSSProperties;
  goal: Goal;
  show_name?: boolean;
  height?: number;
  width?: number;
}) {
  const progress = (goal.amount / goal.target) * 100;
  const imagePath =
    goal.id !== "plus_sign"
      ? progress_to_stage(progress)
      : progress_to_stage(-1);

  if (goal.id === "plus_sign") {
    return (
      <div className="absolute cursor-pointer" style={style}>
        <div className="flex flex-col items-center">
          <Plus className="bouncing-plus" size={45} />
          <Image
            src={imagePath}
            alt="MLEMLEMFL"
            width={width + 20}
            height={height + 20}
            className="animate-sway"
          />
          {show_name && (
            <p className="-mb-2 text-center text-lg font-bold text-black">
              Add Goal
            </p>
          )}
        </div>
      </div>
    );
  }

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
            width={width}
            height={height}
            className="animate-sway"
          />
          {show_name && (
            <p className="-mb-2 text-center text-lg font-bold text-black">
              {goal.name}
            </p>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-160">
        <GoalCard goal={goal} />
      </HoverCardContent>
    </HoverCard>
  );
}
