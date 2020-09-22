import { firestore } from "../firebase";
import showSnackbar from "../utils/showSnackbar";
export const update = (splitRatio: number) => {
  setTimeout(() => {
    showSnackbar({ text: "Error updating Split Ratio within 3s" });
  }, 3000);

  firestore
    .update({
      splitRatio,
    })
    .then(() => {
      showSnackbar({ text: "Successfully updated Split Ratio" });
    });
};
