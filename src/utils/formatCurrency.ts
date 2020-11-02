export const formatCurrency = (amount: number) => {
  let formatted = "£" + (amount || 0).toFixed(2);
  if (amount < 0) {
    //negative
    formatted = "(" + formatted + ")";
  }
  return formatted;
};
