<script lang="ts">
  import { db } from "../../firebase";
  import FinanceSlatList from "./FinanceSlatList.svelte";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";
  import FinanceCharts from "./FinanceCharts.svelte";

  $: finances = $db ? $db.finance : [];

  let showChart = false;
</script>

<style lang="scss">
  .top_row {
    display: flex;
  }
</style>

<div class="top_row">
  <FormField>
    <Switch bind:checked={showChart} />
    <small slot="label">{showChart ? 'List view' : 'Chart view'}</small>
  </FormField>
</div>
{#if showChart}
  <FinanceCharts />
{:else}
  <FinanceSlatList {finances} />
{/if}
