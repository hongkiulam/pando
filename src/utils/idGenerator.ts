import { db } from "../firebase";
import type { Record } from "../types/db";

let database: Record;
const u = db.subscribe((d) => {
  database = d;
});

const generateId = () => {
  return Math.round(Math.random() * 999);
};

const getAvailableId = (existingIds: number[]) => {
  let newId = generateId();
  while (existingIds.includes(newId)) {
    newId = generateId();
  }
  return newId;
};

export const createBillTypeId = () => {
  let billTypeIds = database.billTypes.map((x) => x.id);
  return getAvailableId(billTypeIds);
};
export const createIncomeTypeId = () => {
  let incomeTypeIds = database.incomeTypes.map((x) => x.id);
  return getAvailableId(incomeTypeIds);
};
export const createStockTypeId = () => {
  let stockTypeIds = database.stockTypes.map((x) => x.id);
  return getAvailableId(stockTypeIds);
};
export const createFinanceId = () => {
  let financeIds = database.finance.map((x) => x.id);
  return getAvailableId(financeIds);
};
export const createStockId = () => {
  let stockIds = database.stockTypes.map((x) => x.id);
  return getAvailableId(stockIds);
};
