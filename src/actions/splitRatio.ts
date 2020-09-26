import { firestore } from "../firebase";
import { pushToast } from "./toast";

export const update = (splitRatio: number) => {
  const errorTimeout = setTimeout(() => {
    pushToast("Error updating Split Ratio within 3s");
  }, 3000);

  firestore
    .update({
      splitRatio,
    })
    .then(() => {
      pushToast("Successfully updated Split Ratio");
      clearTimeout(errorTimeout);
    });
};
