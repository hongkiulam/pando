export type Frequency = "MONTHLY" | "YEARLY" | "ONEOFF";
export interface FirestoreTimeStamp {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
}
export interface BillType {
  default: number;
  name: string;
  frequency: Frequency;
}
export interface IncomeType {
  default: number;
  name: string;
  frequency: Frequency;
}
export interface StockType {
  name: string;
}
export interface Stock {
  accumulated: number;
  name: string;
  amount: number;
  id: number;
  date: FirestoreTimeStamp;
}
export interface Finance {
  bills: {
    amount: number;
    name: string;
  }[];
  income: {
    name: string;
    amount: number;
  }[];
  id: number;
  accSaved: number;
  accSpending: number;
  remainingSaved: number;
  remainingSpending: number;
  saved: number;
  spending: number;
  date: FirestoreTimeStamp;
}

export interface Record {
  billTypes: BillType[];
  stocks: Stock[];
  incomeTypes: IncomeType[];
  totals: {
    saved: number;
    spending: number;
    stocks: number;
  };
  splitRatio: number;
  stockTypes: StockType[];
  finance: Finance[];
}
