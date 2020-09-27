import { firestore, db } from "../firebase";
import type { BillType } from "../types/db";
import { pushToast } from "./toast";

export const update = (billSetting: BillType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Bill Setting within 3s");
  }, 3000);

  let newBillTypes: BillType[] = [];
  const unsubscribe = db.subscribe((database) => {
    newBillTypes = database.billTypes;
  });
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
