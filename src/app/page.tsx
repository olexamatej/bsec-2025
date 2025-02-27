import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getUserById } from "~/server/queries/user";

export default async function HomePage() {
  const user = await getUserById("c3b9cd23-1298-41a1-889c-8f7639aff150")
  return (
    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
      Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
      <Button>Ahojda</Button>
    </h1>
  );
}
