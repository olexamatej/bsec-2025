"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  score: number;
  completedGoals: number;
  rank: number;
};

type LeaderboardProps = {
  users: User[];
  title?: string;
  description?: string;
};

export default function Leaderboard({
  users,
  title = "Goals Leaderboard",
  description = "Top goal achievers in our community",
}: LeaderboardProps) {
  const router = useRouter();

  const handleUserClick = (userId: string) => {
    router.push(`/goals?user_id=${userId}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Goals Completed</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => handleUserClick(user.id)}
              >
                <TableCell className="p-0 text-center">
                  {user.rank === 1 ? (
                    <Badge className="inline-flex h-full w-full items-center justify-center rounded-sm bg-yellow-500 text-lg font-medium hover:bg-yellow-600">
                      <span className="mr-1 text-xl">🏆</span>
                      {user.rank}
                    </Badge>
                  ) : user.rank === 2 ? (
                    <Badge className="inline-flex h-full w-full items-center justify-center rounded-sm bg-gray-400 text-lg font-medium hover:bg-gray-500">
                      <span className="mr-1 text-xl">🥈</span>
                      {user.rank}
                    </Badge>
                  ) : user.rank === 3 ? (
                    <Badge className="inline-flex h-full w-full items-center justify-center rounded-sm bg-amber-600 text-lg font-medium hover:bg-amber-700">
                      <span className="mr-1 text-xl">🥉</span>
                      {user.rank}
                    </Badge>
                  ) : (
                    <Badge className="inline-flex h-full w-full items-center justify-center rounded-sm bg-slate-200 text-lg font-medium text-slate-700 hover:bg-slate-300">
                      {user.rank}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.completedGoals}</TableCell>
                <TableCell className="text-right font-medium">
                  {user.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
