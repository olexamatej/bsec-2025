"use client";

import { useState } from "react";
import Meadow from "~/components/goals/meadow";
import { PlantVisualizer } from "~/components/goals/plant-visualizer";
import { Slider } from "~/components/ui/slider";
import { type Goal } from "~/server/db/schema";

export default function Page() {
  const [value, setValue] = useState<number>(0);
  const goals = 

  return (
    <div className="h-full w-full items-center justify-center">
      <Meadow
        flowers={[
          {
            id: "1",
            name: "Lambo",
            target: 10000,
            amount: 5000,
            target_date: new Date("2022-05-01"),
          } as Goal,
          {
            id: "2",
            name: "Investice",
            target: 50000,
            amount: 45000,
            target_date: new Date("2025-03-10"),
          } as Goal,
          {
            id: "3",
            name: "Dovolená",
            target: 20000,
            amount: 3000,
            target_date: new Date("2025-12-31"),
          } as Goal,
        ]}
      />
    </div>
  );
}
