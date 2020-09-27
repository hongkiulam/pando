import { firestore, db } from "../firebase";
import type { BillType } from "../types/db";
import { createBillTypeId } from "../utils/idGenerator";
import { pushToast } from "./toast";

let billTypes: BillType[];
const u = db.subscribe((d) => {
  billTypes = d?.billTypes;
});

export const update = (billSetting: BillType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Bill Setting within 3s");
  }, 3000);

  let newBillTypes: BillType[] = [...billTypes];
  const indexToUpdate = newBillTypes.findIndex(
    (bT) => bT.id === billSetting.id
  );
  newBillTypes.splice(indexToUpdate, 1, billSetting);
  firestore
    .update({
      billTypes: newBillTypes,
    })
    .then(() => {
      pushToast("Successfully updated Bill Setting");
      clearTimeout(errorTimeout);
    });
};
export const remove = (billSetting: BillType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error removing Bill Setting within 3s");
  }, 3000);

  let newBillTypes: BillType[] = [...billTypes].filter(
    (bT) => bT.id !== billSetting.id
  );
  firestore
    .update({
      billTypes: newBillTypes,
    })
    .then(() => {
      pushToast("Successfully removed Bill Setting");
      clearTimeout(errorTimeout);
    });
};
export const add = (billSetting: BillType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error adding Bill Setting within 3s");
  }, 3000);

  const billSettingWithId = { ...billSetting, id: createBillTypeId() };
  let newBillTypes = [...billTypes, billSettingWithId];
  firestore
    .update({
      billTypes: newBillTypes,
    })
    .then(() => {
      pushToast("Successfully added Bill Setting");
      clearTimeout(errorTimeout);
    });
};
