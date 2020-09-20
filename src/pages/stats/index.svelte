<script>
  import Tabs from "../../components/Tabs.svelte";
  import FinanceStats from "../../components/FinanceStats.svelte";
  import StockStats from "../../components/StockStats.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Finance";
  const tabs = ["Finance", "Stocks"];
  const tabsToComponent = {
    Finance: FinanceStats,
    Stocks: StockStats,
  };
</script>

<style>

</style>

<Tabs name="stats-tab" items={tabs} bind:value={selectedTab} />
<PageContainer {tabs} {tabsToComponent} bind:selectedTab />

