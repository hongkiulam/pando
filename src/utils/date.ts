import { firestore } from "../firebase";
import { DateTime } from "luxon";

import type { FirestoreTimeStamp, Frequency } from "../types/db";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayWithSuffix = (dayOfMonth: number) => {
  // obtain unit value from day of month
  const d = dayOfMonth.toString();
  const unit = d[d.toString().length - 1];

  const suffix = {
    "1": "st",
    "2": "nd",
    "3": "rd",
  };
  return `${dayOfMonth}${suffix[unit] || "th"}`;
};

export const getShortMonth = (date: Date | FirestoreTimeStamp) => {
  let d: Date;
  if ((date as FirestoreTimeStamp).toDate) {
    d = (date as FirestoreTimeStamp).toDate();
  } else {
    d = date as Date;
  }
  const month = d.getMonth();
  const shortMonth = monthNames[month].slice(0, 3).toUpperCase();
  return shortMonth;
};
export const getRecurString = (
  date: Date | FirestoreTimeStamp,
  frequency: Frequency
): string => {
  if (frequency === "ONEOFF") return "Does not repeat";
  if (!date) return "Start date not provided!";
  let d: Date;
  if ((date as FirestoreTimeStamp).toDate) {
    d = (date as FirestoreTimeStamp).toDate();
  } else {
    d = date as Date;
  }
  const dayOfMonth = d.getDate();
  const month = monthNames[d.getMonth()];
  switch (frequency) {
    case "MONTHLY":
      return `Recurs on the ${dayWithSuffix(dayOfMonth)} of every month.`;
    case "YEARLY":
      return `Recurs on the ${dayWithSuffix(dayOfMonth)} ${month} every year.`;
  }
};
export const dateToTimestamp = (date: Date) => {
  return firestore.Timestamp.fromDate(date);
};
export const millisToTimestamp = (millis: number) => {
  return firestore.Timestamp.fromMillis(millis);
};
export const timeStampToISO = (ts?: FirestoreTimeStamp) => {
  return ts ? DateTime.fromMillis(ts.toMillis()).toISODate() : "";
};
export const isoToTimestamp = (iso: string) => {
  return dateToTimestamp(DateTime.fromISO(iso).toJSDate());
};
