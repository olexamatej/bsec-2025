"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Trash2, Search, ArrowUpDown } from "lucide-react";
import { StandingOrderWithDeps } from "~/server/queries/standing-orders";
import { useIsMounted } from "~/lib/use-is-mounted";
import { deleteStandingOrderClient } from "~/lib/api/standing-orders";
import { Badge } from "~/components/ui/badge";

export function StandingOrderList(data: {
  standingOrders: StandingOrderWithDeps[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"start" | "amount">("start");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const isMounted = useIsMounted();

  // Filter standing orders based on search term and description
  const filteredOrders = data.standingOrders.filter((order) => {
    const matchesSearch =
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Sort standing orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "start") {
      return sortOrder === "asc"
        ? new Date(a.interval_start).getTime() -
            new Date(b.interval_start).getTime()
        : new Date(b.interval_start).getTime() -
            new Date(a.interval_start).getTime();
    } else {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search standing orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as any)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={toggleSortOrder}>
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {sortedOrders.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No standing orders found
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {order.amount.toLocaleString()} €
                    </span>
                    <Badge
                      variant={
                        order.order_type === "incoming"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {order.order_type}
                    </Badge>
                    {order.tag && (
                      <Badge variant="outline">{order.tag.name}</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.description}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Every {order.interval_amount}{" "}
                    {order.interval === 1 ? "day" : "days"}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isMounted
                      ? `${new Date(order.interval_start).toLocaleDateString()} - ${new Date(order.interval_end).toLocaleDateString()}`
                      : ""}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteStandingOrderClient(order.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
