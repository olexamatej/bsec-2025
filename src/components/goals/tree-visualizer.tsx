import type React from "react";
import Image from "next/image";

const progress_to_stage = (progress: number): string => {
  const path = "/plant-growth/kytka{index}.svg";

  if (progress < 20) {
    return path.replace("{index}", "1");
  } else if (progress < 40) {
    return path.replace("{index}", "2");
  } else if (progress < 60) {
    return path.replace("{index}", "3");
  } else if (progress < 80) {
    return path.replace("{index}", "4");
  } else {
    return path.replace("{index}", "5");
  }
};

export function TreeVisualizer({ progress }: { progress: number }) {
  const imagePath = progress_to_stage(progress);
  console.log(imagePath);
  return (
    <div>
      <Image src={imagePath} alt="tree visualizer" width={120} height={120} />
    </div>
  );
}
