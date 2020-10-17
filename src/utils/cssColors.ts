const getCSSVar = (variable) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
};
export const primary = getCSSVar("--primary");
export const secondary = getCSSVar("--secondary");
export const primaryLight = getCSSVar("--primary-light");
export const success = getCSSVar("--success");
export const danger = getCSSVar("--danger");
export const light = getCSSVar("--light");
export const medium = getCSSVar("--medium");
export const dark = getCSSVar("--dark");
