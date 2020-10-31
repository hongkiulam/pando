<script>
  import { billSettings } from "../../actions";
  import { db } from "../../firebase";
  import Dialog from "@smui/dialog";
  import Button, { Icon } from "@smui/button";
  import Slat from "../Slat.svelte";
  import EditBillType from "./EditBillType.svelte";
  import { getRecurString } from "../../utils/date";
  import { formatCurrency } from "../../utils/formatCurrency";
  $: billTypes = $db ? $db.billTypes : [];

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
    Add Bill Type
    <Icon class="material-icons">add</Icon>
  </Button>
  <Dialog bind:this={addDialog}>
    <EditBillType create />
  </Dialog>
</div>
{#each billTypes as bT}
  <Slat
    onDelete={() => {
      billSettings.remove(bT);
    }}>
    <div class="main_display">
      <div class="column">
        <small>Type</small>
        <h2 class="property">{bT.name}</h2>
      </div>
      <div class="column">
        <small>Frequency</small>
        <h2 class="property">{bT.frequency}</h2>
      </div>
      <div class="column">
        <small>Default</small>
        <h2 class="property">{formatCurrency(bT.default)}</h2>
      </div>
    </div>
    <div slot="open">
      {getRecurString(bT.startDate?.toDate(), bT.frequency)}
    </div>
    <div slot="edit-dialog">
      <EditBillType initialBillType={bT} />
    </div>
  </Slat>
{/each}
