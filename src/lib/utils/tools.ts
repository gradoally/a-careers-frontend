import { DateTimeFormatOptions } from "next-intl";

export function truncateMiddleText(text: string = "", length: number): string {
  const newTextLength = 2 * length + 3;
  if (text.length <= newTextLength) return "";
  const leftSubText = text.slice(0, length);
  const rightSubText = text.slice(text.length - length);
  return `${leftSubText}...${rightSubText}`;
}

export function convertIsoToCustomFormat(isoDate: string): string {
  if(!isoDate) return "";
  // Convert ISO date to Date object
  const dateObj = new Date(isoDate);

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

  // Check if the given date is today
  if (dateObj.toDateString() === today.toDateString()) {
      // Replace "Date" with "Today" if the date is today
      return "Today";
  } else {
      // Format the date as "Month day, time"
      const options:DateTimeFormatOptions = { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      return `${formattedDate.replace("PM","p.m.").replace("AM","a.m.").replace(" at",",")}`;
  }
}
