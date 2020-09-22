import { getContext } from "svelte";
import { snackbarContextKey } from "attractions/snackbar";
import type { SnackbarProps } from "../types/snackbar";

const showSnackbar = (snackbarProps: SnackbarProps) => {
  (getContext(snackbarContextKey) as any)({ props: snackbarProps });
};
export default showSnackbar;
