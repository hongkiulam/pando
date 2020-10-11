<script>
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import FinanceStats from "../../components/FinanceStats/index.svelte";
  import StockStats from "../../components/StockStats/index.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Finance";
  const tabs = ["Finance", "Stocks"];
  const tabsToComponent = {
    Finance: FinanceStats,
    Stocks: StockStats,
  };
  import { url } from "../../store";
  $url = "/stats";
</script>

<style>

</style>

<TabBar {tabs} let:tab bind:active={selectedTab}>
  <Tab {tab}>
    <Label>{tab}</Label>
  </Tab>
</TabBar>
<PageContainer {tabs} {tabsToComponent} bind:selectedTab />
