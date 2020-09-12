<script>
  import Tabs from "../../components/Tabs.svelte";
  import IncomeSettings from "../../components/IncomeSettings.svelte";
  import BillSettings from "../../components/BillSettings.svelte";
  import SplitRatioSettings from "../../components/SplitRatioSettings.svelte";
  let selectedTab = "Income";
  const tabs = {
    Income: IncomeSettings,
    Bills: BillSettings,
    "Split Ratio": SplitRatioSettings,
  };
</script>

<style>

</style>

<Tabs
  name="settings-tab"
  items={['Income', 'Bills', 'Split Ratio']}
  bind:value={selectedTab} />
<svelte:component this={tabs[selectedTab]} />
