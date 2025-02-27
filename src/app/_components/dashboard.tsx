// components/Dashboard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getUserById } from "~/server/queries/user";
import { AddGoalDialog } from "~/app/_components/add-goal-dialog"; // adjust the path as needed
import { AddTransactionDialog } from "~/app/transactions/_components/add-transaction-dialog";

import { getTags } from "~/server/queries/tags";

interface DashboardProps {
  user: NonNullable<Awaited<ReturnType<typeof getUserById>>>;
  balance: number;
  tags: Awaited<ReturnType<typeof getTags>>;
}
export function Dashboard({ user, balance, tags }: DashboardProps) {
  // Calculate total incoming and outgoing for this month

  const incoming = user.transactions
    .filter((t) => t.transaction_type === "incoming")
    .reduce((sum, t) => sum + t.amount, 0);

  const outgoing = user.transactions
    .filter((t) => t.transaction_type === "outgoing")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar_url || ""} alt={user.display_name} />
          <AvatarFallback>
            {user.display_name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.display_name}</h1>
          <p className="text-muted-foreground">
            Here's your financial overview
          </p>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Your available funds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${incoming.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${outgoing.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions and Goals */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card className="flex flex-col md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </div>
            <AddTransactionDialog tags={tags} />
          </CardHeader>

          <CardContent className="flex-grow">
            <div className="space-y-4">
              {user.transactions
                .slice()
                .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                .slice(0, 5)
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          transaction.transaction_type === "incoming"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {transaction.transaction_type === "incoming" ? (
                          <ArrowUp className="h-5 w-5 text-green-100" />
                        ) : (
                          <ArrowDown className="h-5 w-5 text-red-100" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">
                            {transaction.description}
                          </p>
                          {transaction.tag_id && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                              {
                                tags.find(
                                  (tag) => tag.id === transaction.tag_id,
                                )?.name
                              }
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(transaction.timestamp, {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        transaction.transaction_type === "incoming"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.transaction_type === "incoming" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full">
              <a href="/transactions">View all transactions</a>
            </Button>
          </CardFooter>
        </Card>
        {/* Financial Goals */}
        <Card className="flex flex-col md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Nearest Financial Goals</CardTitle>
              <CardDescription>Track your savings progress</CardDescription>
            </div>
            <AddGoalDialog />
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="space-y-4">
              {user.goals
                .slice()
                .filter((goal) => goal.target_date) // Filter out goals without dates
                .sort((a, b) => {
                  // Sort by how close the target date is to today
                  const today = new Date();
                  const diffA = Math.abs(
                    new Date(a.target_date ?? 0).getTime() - today.getTime(),
                  );
                  const diffB = Math.abs(
                    new Date(b.target_date ?? 0).getTime() - today.getTime(),
                  );
                  return diffA - diffB;
                })
                .slice(0, 4) // Take only the first 5 after sorting
                .map((goal) => {
                  const progressPercentage = Math.round(
                    (goal.amount / goal.target) * 100,
                  );
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{goal.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Due{" "}
                            {goal.target_date
                              ? goal.target_date.toDateString()
                              : "No date set"}
                          </p>
                        </div>
                        <Badge
                          variant={
                            progressPercentage > 50 ? "default" : "outline"
                          }
                        >
                          ${goal.amount} / ${goal.target}
                        </Badge>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  );
                })}
            </div>
          </CardContent>
          <CardFooter className="mt-auto space-x-2 p-2">
            <Button className="mb-4 w-full px-2">
              <a href="/goals">View all goals</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
