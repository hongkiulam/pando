import { writable } from "svelte/store";
import type { URL } from "../types/url";
import type { Toast } from "../types/toast";

export const url = writable<URL>(window.location.pathname as URL);
export const toast = writable<Toast>(null)