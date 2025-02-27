import { cn } from "~/lib/utils";
import { cookies } from "next/headers";
import { SidebarContent } from "./sidebar-content";
import { getUsers } from "~/server/queries/user";
import { UserSelector } from "./user-selector";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
}

export async function Sidebar({
  className,
  name = "John Doe",
  ...props
}: SidebarNavProps) {
  const [users, cookieStore] = await Promise.all([getUsers(), cookies()]);
  const selectedUserId = cookieStore.get("selectedUserId")?.value;

  return (
    <div
      className={cn("flex w-64 flex-col border-r bg-background", className)}
      {...props}
    >
      <div className="flex flex-1 flex-col p-4">
        <SidebarContent name={name} />
        <UserSelector users={users} selectedUserId={selectedUserId} />
      </div>
    </div>
  );
}
