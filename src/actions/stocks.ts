import { docRef, db } from "../firebase";
import type { Stock } from "../types/db";
import { createStockId } from "../utils/idGenerator";
import { pushToast } from "./toast";

let stocks: Stock[];
db.subscribe((d) => {
  stocks = d?.stocks;
});
let doc;
docRef.subscribe((x) => (doc = x));
export const update = (s: Stock) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Stock entry within 3s");
  }, 3000);

  let newStocks = [...stocks];
  const indexToUpdate = newStocks.findIndex((x) => x.id === s.id);
  newStocks.splice(indexToUpdate, 1, s);
  doc
    .update({
      stocks: newStocks,
    })
    .then(() => {
      pushToast("Successfully updated Stock entry");
      clearTimeout(errorTimeout);
    });
};
export const remove = (s: Stock) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error removing Stock entry within 3s");
  }, 3000);

  let newStocks = [...stocks].filter((x) => x.id !== s.id);
  doc
    .update({
      stocks: newStocks,
    })
    .then(() => {
      pushToast("Successfully removed Stock entry");
      clearTimeout(errorTimeout);
    });
};
export const add = (s: Stock) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error adding Stock entry within 3s");
  }, 3000);

  const stockWithId = { ...s, id: createStockId() };
  let newStocks = [...stocks, stockWithId].sort((a, b) => {
    return b.date.toMillis() - a.date.toMillis();
  });

  doc
    .update({
      stocks: newStocks,
    })
    .then(() => {
      pushToast("Successfully added Stock entry");
      clearTimeout(errorTimeout);
    });
};
