import { Suspense } from "react";
import Leaderboard from "~/components/leaderboard/leaderboard";
import { getUsers } from "~/server/queries/user"; // You'll need to create this function

export default async function LeaderboardPage() {
  // Fetch users and sort them by score
  const users = await getUsers();

  // Calculate ranks based on score
  const rankedUsers = users
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
      name: user.user_name,
      avatarUrl: user.avatar_url,
      score: user.score,
    }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Community Leaderboard</h1>
      <Suspense fallback={<div>Loading leaderboard...</div>}>
        <Leaderboard users={rankedUsers} />
      </Suspense>
    </div>
  );
}
