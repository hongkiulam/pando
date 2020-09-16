<script>
  import Tabs from "../../components/Tabs.svelte";
  import FinanceStats from "../../components/FinanceStats.svelte";
  import StockStats from "../../components/StockStats.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Finance";
  const tabs = {
    Finance: FinanceStats,
    Stocks: StockStats,
  };
</script>

<style>

</style>

<Tabs name="stats-tab" items={['Finance', 'Stocks']} bind:value={selectedTab} />
<PageContainer
  tabs={['Finance', 'Stocks']}
  {selectedTab}
  onTabChange={(nextTab) => {
    selectedTab = nextTab;
  }}>
  <svelte:component this={tabs[selectedTab]} />
</PageContainer>
