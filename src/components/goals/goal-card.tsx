import { CalendarIcon } from "lucide-react";
import { type Goal } from "~/server/db/schema";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export function GoalCard({ goal }: { goal: Goal }) {
  const percentage = (goal.amount / goal.target) * 100;
  return (
    <div className="flex flex-col">
      <h4 className="text-md font-bold">{goal.name}</h4>
      <div key={goal.id} className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant={percentage > 0.5 ? "default" : "outline"}>
            ${goal.amount} / ${goal.target}
          </Badge>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
      <div className="flex items-center pt-2">
        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
        <span className="text-xs text-muted-foreground">
          {goal.target_date ? goal.target_date.toDateString() : "No date set"}
        </span>
      </div>
    </div>
  );
}
