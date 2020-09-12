<script>
  import Tabs from "../../components/Tabs.svelte";
  import FinanceStats from "../../components/FinanceStats.svelte";
  import StockStats from "../../components/StockStats.svelte";
  let selectedTab = "Finance";
  const tabs = {
    Finance: FinanceStats,
    Stocks: StockStats,
  };
</script>

<style>

</style>

<Tabs name="add-tab" items={['Finance', 'Stocks']} bind:value={selectedTab} />
<svelte:component this={tabs[selectedTab]} />
