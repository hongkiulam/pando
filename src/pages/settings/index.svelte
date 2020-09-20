<script>
  import Tabs from "../../components/Tabs.svelte";
  import IncomeSettings from "../../components/IncomeSettings.svelte";
  import BillSettings from "../../components/BillSettings.svelte";
  import SplitRatioSettings from "../../components/SplitRatioSettings.svelte";
  import PageContainer from "../../components/PageContainer.svelte";
  let selectedTab = "Income";
  const tabs = ["Income", "Bills", "Split Ratio"];
  const tabsToComponent = {
    Income: IncomeSettings,
    Bills: BillSettings,
    "Split Ratio": SplitRatioSettings,
  };
</script>

<style>

</style>

<Tabs name="settings-tab" items={tabs} bind:value={selectedTab} />
<PageContainer {tabs} {tabsToComponent} bind:selectedTab />
