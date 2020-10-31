import { docRef, db } from "../firebase";
import type { StockType } from "../types/db";
import { createStockTypeId } from "../utils/idGenerator";
import { pushToast } from "./toast";

let stockTypes: StockType[];
db.subscribe((d) => {
  stockTypes = d?.stockTypes;
});
let doc;
docRef.subscribe((x) => (doc = x));
export const update = (stockSetting: StockType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Stock Setting within 3s");
  }, 3000);

  let newStockTypes: StockType[] = [...stockTypes];
  const indexToUpdate = newStockTypes.findIndex(
    (sT) => sT.id === stockSetting.id
  );
  newStockTypes.splice(indexToUpdate, 1, stockSetting);
  doc
    .update({
      stockTypes: newStockTypes,
    })
    .then(() => {
      pushToast("Successfully updated Stock Setting");
      clearTimeout(errorTimeout);
    });
};
export const remove = (stockSetting: StockType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error removing Stock Setting within 3s");
  }, 3000);

  let newStockTypes: StockType[] = [...stockTypes].filter(
    (sT) => sT.id !== stockSetting.id
  );
  doc
    .update({
      stockTypes: newStockTypes,
    })
    .then(() => {
      pushToast("Successfully removed Stock Setting");
      clearTimeout(errorTimeout);
    });
};
export const add = (stockSetting: StockType) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error adding Stock Setting within 3s");
  }, 3000);

  const stockSettingWithId = { ...stockSetting, id: createStockTypeId() };
  let newStockTypes = [...stockTypes, stockSettingWithId];
  doc
    .update({
      stockTypes: newStockTypes,
    })
    .then(() => {
      pushToast("Successfully added Stock Setting");
      clearTimeout(errorTimeout);
    });
};
