<script>
  import Tabs from "../../components/Tabs.svelte";
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

<Tabs name="add-tab" items={tabs} bind:value={selectedTab} />
<PageContainer {tabs} {tabsToComponent} bind:selectedTab />

