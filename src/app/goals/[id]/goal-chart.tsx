"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { Label, LabelList, Pie, PieChart } from "recharts";

interface GoalChartProps {
  progress: number;
  total: number;
}

const chartConfig = {
  visitors: {
    label: "Goal progress",
  },
  done: {
    label: "Done",
    color: "#D96426",
  },
  remaining: {
    label: "Remaining",
    color: "#269BD9",
  },
} satisfies ChartConfig;

export function GoalChart({ progress, total }: GoalChartProps) {
  const chartData = [
    { browser: "done", visitors: progress, fill: "var(--color-done)" },
    {
      browser: "remaining",
      visitors: total - progress,
      fill: "var(--color-remaining)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius={60}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl font-bold"
                    >
                      {((progress / total) * 100).toFixed(2)}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 24}
                      className="fill-muted-foreground"
                    ></tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
