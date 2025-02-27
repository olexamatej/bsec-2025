"use client";

import { useEffect, useState } from "react";
import { PlantVisualizer } from "./plant-visualizer";
import { type Goal } from "~/server/db/schema";

type Position = {
  top: string;
  left: string;
  scale: number;
};

export default function Meadow({ flowers }: { flowers: Array<Goal> }) {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const generatePositions = () => {
      const newPositions: Array<Position> = [];
      const meadowWidth = 0.7 * window.innerWidth;
      const meadowHeight = 0.7 * window.innerHeight;
      const flowerSize = 100;

      flowers.forEach(() => {
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
      {flowers.map((flower, index) => (
        <PlantVisualizer
          goal={flower}
          key={index}
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
