import { docRef, db } from "../firebase";
import type { Finance } from "../types/db";
import { createFinanceId } from "../utils/idGenerator";
import { pushToast } from "./toast";

let finance: Finance[];
db.subscribe((d) => {
  finance = d?.finance;
});
let doc;
docRef.subscribe((x) => (doc = x));

export const update = (f: Finance) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Finance entry within 3s");
  }, 3000);

  let newFinance = [...finance];
  const indexToUpdate = newFinance.findIndex((x) => x.id === f.id);
  newFinance.splice(indexToUpdate, 1, f);
  doc
    .update({
      finance: newFinance,
    })
    .then(() => {
      pushToast("Successfully updated Finance entry");
      clearTimeout(errorTimeout);
    });
};
export const remove = (f: Finance) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error removing Finance entry within 3s");
  }, 3000);

  let newFinance = [...finance].filter((x) => x.id !== f.id);
  doc
    .update({
      finance: newFinance,
    })
    .then(() => {
      pushToast("Successfully removed Finance entry");
      clearTimeout(errorTimeout);
    });
};
export const add = (f: Finance) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error adding Finance entry within 3s");
  }, 3000);

  const financeWithId = { ...f, id: createFinanceId() };
  let newFinance = [...finance, financeWithId].sort((a, b) => {
    return b.date.toMillis() - a.date.toMillis();
  });

  doc
    .update({
      finance: newFinance,
    })
    .then(() => {
      pushToast("Successfully added Finance entry");
      clearTimeout(errorTimeout);
    });
};
