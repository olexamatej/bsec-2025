"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type Props = {
  src?: string | undefined;
  size?: number;
  name: string;
  className?: string;
} & Omit<Parameters<typeof NextImage>[0], "src">;

enum Status {
  Idle = "idle",
  Loading = "loading",
  Error = "error",
  Success = "success",
}

function getTextSize(size: number) {
  if (size <= 24) {
    return "text-xs";
  }
  if (size <= 32) {
    return "text-sm";
  }
  if (size <= 48) {
    return "text-lg";
  }
  if (size <= 64) {
    return "text-xl";
  }
  return "text-3xl";
}

// https://www.joshuaslate.com/blog/deterministic-react-avatar-fallback

const ACCENT_COLORS = ["#3db378", "#b33d5e", "#3d87b3", "#b3843d"];

const getBackgroundForStringValue = (
  str: string | undefined,
  colorOptions: string[],
) => {
  const strHashedAsNumber = (str ?? "")
    .split("")
    .reduce((accum, val) => val.charCodeAt(0) + accum, str?.length ?? 0);

  return colorOptions[strHashedAsNumber % colorOptions.length];
};

export const Avatar: React.FC<Props> = ({
  src,
  size = 32,
  name,
  className,
  ...rest
}) => {
  const [_, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [status, setStatus] = useState<Status>(
    src ? Status.Loading : Status.Idle,
  );
  const initials = name
    ?.split(" ")
    .map((chunk) => chunk.charAt(0).toLocaleUpperCase())
    .slice(0, 2)
    .join("");

  useEffect(() => {
    if (src) {
      setStatus(Status.Loading);

      // Test if the image can be loaded successfully by creating a non-rendered Image element
      // and adding event listeners for a "load" or "error"
      const img = new Image();

      // If the image is loaded successfully, we'll render it
      img.onload = () => {
        setStatus(Status.Success);
      };

      // Otherwise, we'll show the initials
      img.onerror = () => {
        setStatus(Status.Error);
      };

      // Now that the event handlers have been added, set the source to initiate the image load
      img.src = src;
    }
  }, [src]);
  const isLoading = status === Status.Loading;
  const hasLoadedImage = status === Status.Success;

  const textSize = getTextSize(ref.current?.clientWidth ?? size);

  return (
    <div
      style={{
        height: rest.fill ? undefined : size,
        width: rest.fill ? undefined : size,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: getBackgroundForStringValue(name, ACCENT_COLORS),
        color: "#FFF",
      }}
      ref={ref}
      className={cn(
        className,
        rest.fill ? "!h-full !w-full" : "",
        textSize,
        "relative",
      )}
    >
      {src && (isLoading || hasLoadedImage) && (
        <NextImage
          src={src}
          style={{
            display: isLoading ? "none" : "block",
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          width={rest.fill ? undefined : size}
          height={rest.fill ? undefined : size}
          className={className}
          {...rest}
        />
      )}

      {!hasLoadedImage && !isLoading && <span>{initials}</span>}
    </div>
  );
};
