import { docRef } from "../firebase";
import { pushToast } from "./toast";

let doc;
docRef.subscribe((x) => (doc = x));
export const update = (splitRatio: number) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Split Ratio within 3s");
  }, 3000);

  doc
    .update({
      splitRatio,
    })
    .then(() => {
      pushToast("Successfully updated Split Ratio");
      clearTimeout(errorTimeout);
    });
};
