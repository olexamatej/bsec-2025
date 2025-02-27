import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const time_intervals = [
  {
    name: "Day",
    value: 86400,
  },
  {
    name: "Week",
    value: 604800,
  },
  {
    name: "Month",
    value: 2592000,
  },
  {
    name: "Year",
    value: 31536000,
  },
]

export function getIntervalName(value: number) {
  return time_intervals.find((interval) => interval.value === value)?.name;
}

export function getIntervalValue(name: string) {
  return time_intervals.find((interval) => interval.name === name)?.value;
}