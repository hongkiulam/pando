// https://stackoverflow.com/a/55261098
// export default ((sum) => (value: number) => (sum += value))(0);

import type { FirestoreTimeStamp } from "../types/db";

export default <T extends { date: FirestoreTimeStamp }>(
  arr: T[] = [],
  key: keyof T,
  reverse = true
) => {
  const cumulativeArr: number[] = [];
  const reversedArr = reverse ? [...arr].reverse() : [...arr];
  reversedArr.reduce(
    (acc, curr, index) =>
      (cumulativeArr[index] = (acc + (curr as any)[key]) as number),
    0
  );
  return cumulativeArr.reverse();
};
