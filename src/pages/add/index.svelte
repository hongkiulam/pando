<script>
  import Tabs from "../../components/Tabs.svelte";
  import AddFinance from "../../components/AddFinance.svelte";
  import AddStocks from "../../components/AddStocks.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Finance";
  const tabs = {
    Finance: AddFinance,
    Stocks: AddStocks,
  };
</script>

<style>

</style>

<Tabs name="add-tab" items={['Finance', 'Stocks']} bind:value={selectedTab} />
<PageContainer
  tabs={['Finance', 'Stocks']}
  {selectedTab}
  onTabChange={(nextTab) => {
    selectedTab = nextTab;
  }}>
  <svelte:component this={tabs[selectedTab]} />
</PageContainer>
