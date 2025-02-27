"no cache";

import Meadow from "~/components/goals/meadow";
import { getUserId } from "~/lib/get-user-id";
import { getUserById } from "~/server/queries/user";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const foreignUserId = await searchParams.then((params) => params["user_id"]);

  const userId = await getUserId();
  // const goals = await getGoalsByUserId(foreignUserId ?? userId);
  const user = await getUserById(foreignUserId ?? userId);

  return (
    <div className="h-full w-full items-center justify-center">
      <Meadow
        user={user}
        key={foreignUserId ?? userId}
        showUserProfile={foreignUserId !== undefined}
      />
    </div>
  );
}
