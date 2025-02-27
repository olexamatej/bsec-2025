"use client";

import { useEffect, useState } from "react";
import { type Goal } from "~/server/db/schema";
import { Card, CardContent } from "~/components/ui/card";
import { PlantVisualizerHover } from "./plant-visualizer-hover";
import { type UserWithDeps } from "~/server/queries/user";

type Position = {
  top: string;
  left: string;
  scale: number;
};

export default function Meadow({
  user,
  showUserProfile,
}: {
  user: UserWithDeps;
  showUserProfile: boolean;
}) {
  const [positions, setPositions] = useState<Position[]>([]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // flowers.push({
    //   name: "test",
    //   description: "test",
    //   id: "plus_sign",
    //   user_id: "test",
    //   target: 0,
    //   amount: 0,
    //   target_date: new Date(),
    // });

    const generatePositions = () => {
      const newPositions: Array<Position> = [];
      const meadowWidth = 0.7 * window.innerWidth;
      const meadowHeight = 0.7 * window.innerHeight;
      const flowerSize = 100;

      user?.goals.forEach(() => {
        let validPosition = false;
        let newPos: Position;

        while (!validPosition) {
          newPos = {
            top: Math.random() * (meadowHeight - flowerSize) + "px",
            left: Math.random() * (meadowWidth - flowerSize) + "px",
            // scale: Math.random() * 0.5 + 0.75,
            scale: 1,
          };

          validPosition = newPositions.every((pos) => {
            const dx = parseFloat(newPos.left) - parseFloat(pos.left);
            const dy = parseFloat(newPos.top) - parseFloat(pos.top);
            return Math.sqrt(dx * dx + dy * dy) > flowerSize;
          });
        }

        newPositions.push(newPos!);
      });
      return newPositions;
    };
    setPositions(generatePositions());
  }, []);

  return (
    <div className="relative h-full w-full rounded-lg bg-green-300">
      {showUserProfile && user && (
        <div className="absolute left-0 top-0 flex items-center p-4">
          <Card className="flex w-32 flex-col items-center justify-center">
            <CardContent className="flex flex-row items-center justify-center py-2">
              <img
                src={user.avatar_url || "/default-profile.png"}
                alt="Profile"
                className="mr-2 h-8 w-8 rounded-full"
              />
              <span className="text-lg font-semibold">{user.display_name}</span>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="absolute right-0 top-0 flex items-center p-4">
        <Card
          className="flex w-[210px] cursor-pointer flex-col items-center justify-center"
          onClick={handleCopy}
        >
          <CardContent className="flex flex-row items-center justify-center py-2">
            <span className="text-lg font-semibold">Share this garden</span>
          </CardContent>
        </Card>
        {copied && (
          <div className="absolute right-0 top-0 mr-2 mt-2 rounded bg-green-500 p-2 text-white">
            Link copied!
          </div>
        )}
      </div>
      {user?.goals.map((flower, index) => (
        <PlantVisualizerHover
          goal={flower}
          key={index}
          show_name={true}
          style={{
            top: positions[index]?.top,
            left: positions[index]?.left,
            transform: `scale(${positions[index]?.scale})`,
          }}
        />
      ))}
    </div>
  );
}
