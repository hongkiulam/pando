<script>
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import IncomeSettings from "../../components/IncomeSettings.svelte";
  import BillSettings from "../../components/BillSettings.svelte";
  import SplitRatioSettings from "../../components/SplitRatioSettings.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Income";
  const tabs = ["Income", "Bills", "Split Ratio"];
  const tabsToComponent = {
    Income: IncomeSettings,
    Bills: BillSettings,
    "Split Ratio": SplitRatioSettings,
  };
</script>

<style>

</style>

<TabBar {tabs} let:tab bind:active={selectedTab}>
  <Tab {tab}>
    <Label>{tab}</Label>
  </Tab>
</TabBar>
<PageContainer {tabs} {tabsToComponent} bind:selectedTab />
