"use client";

import { useState } from "react";
import { TreeVisualizer } from "~/components/goals/tree-visualizer";
import { Slider } from "~/components/ui/slider";

export default function Page() {
  const [value, setValue] = useState<number>(0);

  return (
    <div className="h-full w-1/2 items-center justify-center">
      <h1>Goals</h1>
      <Slider
        defaultValue={[value]}
        max={100}
        step={1}
        onValueChange={(values) => setValue(values[0]!)}
      />
      <TreeVisualizer progress={value} />
    </div>
  );
}
