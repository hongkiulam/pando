import type { Toast } from "../types/toast";
import { toast } from "../store";

export const pushToast = (label: string, t: Toast = { label: "" }) => {
  toast.set({ ...t, label });
};
