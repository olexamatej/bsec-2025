import { Card, CardContent } from "~/components/ui/card";
import type { Post } from "../lib/get-posts";

export function PostTransaction({
  transaction,
}: {
  transaction: NonNullable<Post["transaction"]>;
}) {
  return (
    <Card>
      <CardContent className="flex justify-between pt-6">
        <div className="flex flex-col space-y-1">
          <span>
            {transaction.user.display_name}{" "}
            {transaction.transaction_type === "incoming" ? "received" : "spent"}
          </span>
          <span className="text-4xl font-medium">{transaction.amount} Kč</span>
        </div>
        <div className="flex flex-col items-end justify-center space-y-2">
          <span>{transaction.description}</span>
          {transaction.tag && (
            <span
              className="rounded-xl border px-2 py-1 text-sm"
              style={{
                color: `#${transaction.tag.color}`,
                backgroundColor: `#${transaction.tag.color}20`,
                borderColor: `#${transaction.tag.color}`,
              }}
            >
              # {transaction.tag.name}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
