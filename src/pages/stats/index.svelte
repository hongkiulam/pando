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
  .container {
    padding: var(--padding);
  }
</style>

<Tabs name="stats-tab" items={['Finance', 'Stocks']} bind:value={selectedTab} />
<div class="container">
  <svelte:component this={tabs[selectedTab]} />
</div>
