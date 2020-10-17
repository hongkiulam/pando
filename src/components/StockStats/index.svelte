<script>
  import { db } from "../../firebase";
  import Dialog from "@smui/dialog";
  import Button, { Icon } from "@smui/button";
  import Switch from "@smui/switch";
  import FormField from "@smui/form-field";

  import StockSlatList from "./StockSlatList.svelte";
  import EditStock from "./EditStock.svelte";
  import StockCharts from "./StockCharts.svelte";

  $: stocks = $db ? $db.stocks : [];
  let addDialog;

  let showChart = false;
</script>

<style>
  .top_row {
    display: flex;
    justify-content: space-between;
  }
</style>

<div class="top_row">
  <FormField>
    <Switch bind:checked={showChart} />
    <small slot="label">{showChart ? 'List view' : 'Chart view'}</small>
  </FormField>
  <Button
    color="secondary"
    on:click={() => {
      addDialog.open();
    }}>
    Add Stock
    <Icon class="material-icons">add</Icon>
  </Button>
  <!-- Dialog is not rendered -->
  <Dialog bind:this={addDialog}>
    <EditStock create />
  </Dialog>
</div>

{#if showChart}
  <StockCharts />
{:else}
  <StockSlatList {stocks} />
{/if}
