import { writable } from "svelte/store";

type URL = "/" | "/stats" | "/settings" | "/add";
export const url = writable<URL>(window.location.pathname as URL);
