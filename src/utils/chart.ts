import type Chart from "chart.js";
import type { FirestoreTimeStamp } from "../types/db";
import cumulativeMap from "./cumulativeMap";
import { merge } from "lodash";

export const amountByTypeId = <
  T extends { date: FirestoreTimeStamp; amount: number }
>(
  arr: T[], // e.g. stocks
  typeArr: { id?: number; name: string }[], // e.g. stockTypes
  key: keyof T // e.g. stockTypeId
): Chart.ChartDataSets[] => {
  // go through arr and filter by type id
  // returns array of object {x: Date, y: amount}
  const getDataByTypeId = (arr: T[], id: number) => {
    const data = arr.filter((el) => {
      if (typeof el[key] === "number") {
        return ((el[key] as unknown) as number) === id;
      }
      throw new Error(`${key} is not of type number`);
    });
    return data.map((objInArr) => ({
      x: objInArr.date.toDate(),
      y: objInArr.amount,
    }));
  };

  // returns dataset array for chart
  return typeArr.map((x) => ({
    label: x.name,
    data: getDataByTypeId(arr, x.id),
  }));
};

export const timeOptions = (
  unit: Chart.TimeUnit,
  additionalOptions?: Chart.ChartOptions
) => {
  return merge(
    { scales: { xAxes: [{ type: "time", time: { unit } }] } },
    additionalOptions
  );
};

export const cumulativeChart = <T extends { date: FirestoreTimeStamp }>(
  arr: T[],
  key: keyof T,
  reverse = true
) => {
  interface CumulativeChart extends Array<number> {
    toDataset?: (label: string) => Chart.ChartDataSets[];
    toTimeData?: () => Chart.ChartDataSets["data"];
    toTimeDataset?: (label: string) => Chart.ChartDataSets[];
  }
  // create cumulative map, simply returns array of numbers holding cumulative values
  const map: CumulativeChart = cumulativeMap(arr, key, reverse);
  // toTimeData method, creates chart time data by taking the above map
  // and remapping it to an object holding the x (date) value and y (original) value
  map.toTimeData = () => {
    return map.map((value, index) => ({
      x: arr[index].date.toDate(),
      y: value,
    }));
  };
  // toTimeDataset method, creates a chart time dataset [{label, data}]
  map.toTimeDataset = (label) => {
    const data = map.map((value, index) => ({
      x: arr[index].date.toDate(),
      y: value,
    }));
    return [{ label, data }];
  };

  map.toDataset = (label) => {
    const data = [...map];
    return [{ label, data }];
  };
  return map as CumulativeChart;
};
