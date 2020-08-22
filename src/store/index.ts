import { readable, writable } from "svelte/store";

export const currentRoute = readable("/", (set) => {
  set(location.hash.replace("#", ""));
  window.addEventListener("hashchange", () => {
    set(location.hash.replace("#", ""));
  });
});
