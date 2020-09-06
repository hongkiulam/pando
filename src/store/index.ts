import { writable } from "svelte/store";
import type { URL } from "../types/url";

export const url = writable<URL>(window.location.pathname as URL);
