<script>
  import { db } from "../../firebase";
  import Dialog from "@smui/dialog";
  import Button, { Icon } from "@smui/button";
  import Slat from "../Slat.svelte";
  import EditIncomeType from "./EditIncomeType.svelte";
  import { incomeSettings } from "../../actions";
  $: incomeTypes = $db?.incomeTypes || [];

  let addDialog;
</script>

<style>
  .main_display {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 1fr 1fr;
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
    Add Item
    <Icon class="material-icons">add</Icon>
  </Button>
  <Dialog bind:this={addDialog}>
    <EditIncomeType create />
  </Dialog>
</div>
{#each incomeTypes as iT}
  <Slat
    onDelete={() => {
      incomeSettings.remove(iT);
    }}>
    <div class="main_display">
      <div class="column">
        <small>Type</small>
        <h2 class="property">{iT.name}</h2>
      </div>
      <div class="column">
        <small>Frequency</small>
        <h2 class="property">{iT.frequency}</h2>
      </div>
      <div class="column">
        <small>Default</small>
        <h2 class="property">£{iT.default}</h2>
      </div>
    </div>
    <div slot="edit-dialog">
      <EditIncomeType initialIncomeType={iT} />
    </div>
  </Slat>
{/each}
