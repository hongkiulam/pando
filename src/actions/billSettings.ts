import { docRef, db } from "../firebase";
import type { BillType } from "../types/db";
import { createBillTypeId } from "../utils/idGenerator";
import { pushToast } from "./toast";

let billTypes: BillType[];
db.subscribe((d) => {
  billTypes = d?.billTypes;
});
let doc;
docRef.subscribe((x) => (doc = x));

export const update = (billSetting: BillType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Bill Setting within 3s");
  }, 3000);

  let newBillTypes: BillType[] = [...billTypes];
  const indexToUpdate = newBillTypes.findIndex(
    (bT) => bT.id === billSetting.id
  );
  newBillTypes.splice(indexToUpdate, 1, billSetting);
  doc
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
  doc
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
  doc
    .update({
      billTypes: newBillTypes,
    })
    .then(() => {
      pushToast("Successfully added Bill Setting");
      clearTimeout(errorTimeout);
    });
};
