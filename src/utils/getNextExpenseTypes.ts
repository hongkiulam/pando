import type { BillType, IncomeType } from "../types/db";

/**
 * Gets the types which are applicable to the current date
 *
 * gets all types which are monthly
 *
 * gets all types which are yearly and the current month matches the recurring month
 *
 * */
export const getNextExpenseTypes = (types: (BillType | IncomeType)[]) => {
  return types.filter((type) => {
    if (type.frequency === "MONTHLY") {
      return true;
    }
    if (type.frequency === "YEARLY") {
      const monthToApply = type.startDate.toDate().getMonth();
      const thisMonth = new Date().getMonth();
      return monthToApply === thisMonth;
    }
  });
};
