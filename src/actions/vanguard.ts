import { firestore } from "../firebase";
import { vanguard } from "../store";
import type { Resource } from "../types/vanguard";

const api = "https://warm-sands-58803.herokuapp.com";
// const api = "http://localhost:8080";

export const get = async (resource: Resource) => {
  const username = localStorage.getItem("vgUsername");
  const password = localStorage.getItem("vgPassword");
  if (!username || !password) return;
  let currentState;
  const unsubscribe = vanguard.subscribe((vg) => {
    currentState = vg;
  });
  unsubscribe();
  if (currentState.data[resource] || currentState.loading) return; // we have already fetched resource this session

  vanguard.set({
    ...currentState,
    loading: true,
  });

  const vanguardDataDocRef = await firestore()
    .collection("vanguard")
    .doc(resource)
    .get();
  const vanguardDataFromFirestore = vanguardDataDocRef.data();
  if (vanguardDataFromFirestore) {
    const now = new Date();
    const storedPerformanceDate = new Date(vanguardDataFromFirestore.date);
    const isSameDay = now.getDate() === storedPerformanceDate.getDate();
    if (isSameDay) {
      const {
        value,
        amountChange,
        percentageChange,
      } = vanguardDataFromFirestore;

      vanguard.update((state) => ({
        ...state,
        loading: false,
        error: "",
        data: {
          ...state.data,
          performance: {
            value: Number(value),
            amountChange: Number(amountChange),
            percentageChange: Number(percentageChange),
          },
        },
      }));
      return;
    }
  }

  const response = await fetch(`${api}/${resource}`, {
    headers: {
      Authorization: `Basic ${btoa(username + ":" + password)}`,
    },
  });
  const vg = await response.json();

  if (!vg.success) {
    vanguard.update((state) => ({
      ...state,
      loading: false,
      error: vg.errorMsg.join(", "),
    }));
  } else {
    vanguard.update((state) => ({
      ...state,
      loading: false,
      error: "",
      data: {
        ...state.data,
        [resource]: vg.result[resource],
      },
    }));
  }
};

export const authorise = async (username: string, password: string) => {
  const response = await fetch(`${api}/authorise`, {
    method: "HEAD",
    headers: {
      Authorization: `Basic ${btoa(username + ":" + password)}`,
    },
  });
  return response.ok;
};
