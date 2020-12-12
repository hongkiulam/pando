import { readable, writable } from "svelte/store";
import type { URL } from "../types/url";
import type { Toast } from "../types/toast";
import type { VGState } from "../types/vanguard";

export const url = writable<URL>(window.location.pathname as URL);
export const toast = writable<Toast>(null);
export const vanguard = writable<VGState>({
  loading: false,
  error: "",
  data: {},
});
export const vanguardCredentials = writable({
  username: localStorage.getItem("vgUsername"),
  password: localStorage.getItem("vgPassword"),
});
export const vanguardLoggedIn = readable(false, (set) => {
  vanguardCredentials.subscribe((cred) => {
    set(!!cred.username && !!cred.password);
  });
});
