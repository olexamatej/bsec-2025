import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getUserById } from "~/server/queries/user";

export default async function HomePage() {
  const user = await getUserById("c3b9cd23-1298-41a1-889c-8f7639aff150");
  //TEMP FIX
  const balance = 1337.42;

  if (!user) {
    return <div>Error: User not found</div>;
  }

  // Calculate total incoming and outgoing for this month
  const incoming = user.transactions
    .filter((t) => t.transaction_type === "incoming")
    .reduce((sum, t) => sum + t.amount, 0);

  const outgoing = user.transactions
    .filter((t) => t.transaction_type === "outgoing")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${incoming.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        transaction.transaction_type === "incoming"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.transaction_type === "incoming" ? (
                        <ArrowUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {transaction.description}
                      </p>
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
            <Button variant="outline" className="mt-4 w-full">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Financial Goals</CardTitle>
            <CardDescription>Track your savings progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.goals.map((goal) => {
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
            <Button variant="outline" className="mt-4 w-full">
              Add New Goal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
