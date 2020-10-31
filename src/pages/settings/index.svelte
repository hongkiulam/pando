<script>
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import IncomeSettings from "../../components/IncomeSettings/index.svelte";
  import BillSettings from "../../components/BillSettings/index.svelte";
  import StockSettings from "../../components/StockSettings/index.svelte";
  import SplitRatioSettings from "../../components/SplitRatioSettings.svelte";
  import Logout from "../../components/Logout.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Income";
  const tabs = ["Income", "Bills", "Stocks", "Split Ratio", "Account"];
  const tabsToComponent = {
    Income: IncomeSettings,
    Bills: BillSettings,
    Stocks: StockSettings,
    "Split Ratio": SplitRatioSettings,
    Account: Logout,
  };
  import { url } from "../../store";
  $url = "/settings";
</script>

<style>

</style>

<TabBar {tabs} let:tab bind:active={selectedTab}>
  <Tab {tab}>
    <Label>{tab}</Label>
  </Tab>
</TabBar>
<PageContainer {tabs} {tabsToComponent} bind:selectedTab />
