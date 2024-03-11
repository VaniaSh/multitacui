import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const round2 = (num: number) =>
    Math.round((num + Number.EPSILON) * 100) / 100

export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString()
  return doc
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`
}
export function normalizeTimestamp(inputTimestamp: Date) {
  const dateObject = new Date(inputTimestamp);

  const formattedDate = `${dateObject.getDate().toString().padStart(2, '0')}.${(dateObject.getMonth() + 1).toString().padStart(2, '0')}.${dateObject.getFullYear()}`;
  const formattedTime = `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}`;

  return `${formattedDate} | ${formattedTime}`;
}
