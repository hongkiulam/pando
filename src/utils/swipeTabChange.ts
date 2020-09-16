const swipeTabChange = (
  tabArr: string[],
  selectedTab: string,
  increment: 1 | -1
) => {
  const idx = tabArr.findIndex((tab) => tab === selectedTab);
  const nextIdx = idx + increment;
  if (nextIdx >= 0 && nextIdx < tabArr.length) {
    return tabArr[nextIdx];
  }
  return selectedTab;
};
export default swipeTabChange;
