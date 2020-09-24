<script>
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import AddFinance from "../../components/AddFinance.svelte";
  import AddStocks from "../../components/AddStocks.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Finance";
  const tabs = ["Finance", "Stocks"];
  const tabsToComponent = {
    Finance: AddFinance,
    Stocks: AddStocks,
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
