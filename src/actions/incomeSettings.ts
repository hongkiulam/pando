import { docRef, db } from "../firebase";
import type { IncomeType } from "../types/db";
import { createIncomeTypeId } from "../utils/idGenerator";
import { pushToast } from "./toast";

let incomeTypes: IncomeType[];
db.subscribe((d) => {
  incomeTypes = d?.incomeTypes;
});
let doc;
docRef.subscribe((x) => (doc = x));

export const update = (incomeSetting: IncomeType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Income Setting within 3s");
  }, 3000);

  let newIncomeTypes: IncomeType[] = [...incomeTypes];
  const indexToUpdate = newIncomeTypes.findIndex(
    (iT) => iT.id === incomeSetting.id
  );
  newIncomeTypes.splice(indexToUpdate, 1, incomeSetting);
  doc
    .update({
      incomeTypes: newIncomeTypes,
    })
    .then(() => {
      pushToast("Successfully updated Income Setting");
      clearTimeout(errorTimeout);
    });
};
export const remove = (incomeSetting: IncomeType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error removing Income Setting within 3s");
  }, 3000);

  let newIncomeTypes: IncomeType[] = [...incomeTypes].filter(
    (iT) => iT.id !== incomeSetting.id
  );
  doc
    .update({
      incomeTypes: newIncomeTypes,
    })
    .then(() => {
      pushToast("Successfully removed Income Setting");
      clearTimeout(errorTimeout);
    });
};
export const add = (incomeSetting: IncomeType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error adding Income Setting within 3s");
  }, 3000);

  const incomeSettingWithId = { ...incomeSetting, id: createIncomeTypeId() };
  let newIncomeTypes = [...incomeTypes, incomeSettingWithId];
  doc
    .update({
      incomeTypes: newIncomeTypes,
    })
    .then(() => {
      pushToast("Successfully added Income Setting");
      clearTimeout(errorTimeout);
    });
};
