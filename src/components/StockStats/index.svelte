<script>
  import { stocks as stockAction } from "../../actions";
  import { db } from "../../firebase";
  import Dialog from "@smui/dialog";
  import Button, { Icon } from "@smui/button";
  import Slat from "../Slat.svelte";
  import EditStock from "./EditStock.svelte";
  import { DateTime } from "luxon";

  $: stocks = $db ? $db.stocks : [];
  $: stockTypes = $db ? $db.stockTypes : [];
  let addDialog;

  /**
   * @param {Date} date
   * */
  const formatDate = (date) => {
    return DateTime.fromJSDate(date).toFormat("dd/LL/yy");
  };
  /**
   * @param {string} id
   * */
  const getStockTypeName = (id) => {
    const sT = stockTypes.find((s) => s.id === id);
    return sT ? sT.name : "";
  };
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
    Add Stock
    <Icon class="material-icons">add</Icon>
  </Button>
  <Dialog bind:this={addDialog}>
    <EditStock create />
  </Dialog>
</div>
{#each stocks as s}
  <Slat
    onDelete={() => {
      stockAction.remove(s);
    }}>
    <div class="main_display">
      <div class="column">
        <small>Date</small>
        <h2 class="property">{formatDate(s.date.toDate())}</h2>
      </div>
      <div class="column">
        <small>Type</small>
        <h2 class="property">{getStockTypeName(s.stockTypeId)}</h2>
      </div>
      <div class="column">
        <small>Amount</small>
        <h2 class="property">£{s.amount}</h2>
      </div>
    </div>
    <div slot="edit-dialog">
      <EditStock initialStock={s} />
    </div>
  </Slat>
{/each}
