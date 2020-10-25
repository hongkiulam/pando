<script>
  import { db } from "../../firebase";
  import Dialog from "@smui/dialog";
  import Button, { Icon } from "@smui/button";
  import Slat from "../Slat.svelte";
  import EditStockType from "./EditStockType.svelte";
  import { stockSettings } from "../../actions";
  import { formatCurrency } from "../../utils/formatCurrency";

  $: stockTypes = $db ? $db.stockTypes : [];

  let addDialog;
</script>

<style>
  .main_display {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 1fr;
    gap: var(--paddingS);
  }
  .column {
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .property {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .add_item {
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="add_item">
  <Button
    color="secondary"
    on:click={() => {
      addDialog.open();
    }}>
    Add Stock Type
    <Icon class="material-icons">add</Icon>
  </Button>
  <Dialog bind:this={addDialog}>
    <EditStockType create />
  </Dialog>
</div>
{#each stockTypes as sT}
  <Slat
    onDelete={() => {
      stockSettings.remove(sT);
    }}>
    <div class="main_display">
      <div class="column">
        <small>Type</small>
        <h2 class="property">{sT.name}</h2>
      </div>
      <div class="column">
        <small>Default</small>
        <h2 class="property">{formatCurrency(sT.default)}</h2>
      </div>
    </div>
    <div slot="edit-dialog">
      <EditStockType initialStockType={sT} />
    </div>
  </Slat>
{/each}
