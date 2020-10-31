<script lang="ts">
  import type { Stock } from "../../types/db";
  import Slat from "../Slat.svelte";
  import EditStock from "./EditStock.svelte";
  import { DateTime } from "luxon";
  import { stocks as stockAction } from "../../actions";
  import { db } from "../../firebase";
  import { formatCurrency } from "../../utils/formatCurrency";
  import { getShortMonth } from "../../utils/date";

  $: stockTypes = $db ? $db.stockTypes : [];

  export let stocks: Stock[];

  const formatDate = (date: Date) => {
    return DateTime.fromJSDate(date).toFormat("dd/LL/yy");
  };

  const getStockTypeName = (id: number) => {
    const sT = stockTypes.find((s) => s.id === id);
    return sT ? sT.name : "";
  };
</script>

<style>
  .main_display {
    display: grid;
    grid-template-columns: 1fr minmax(100px, 1fr) 1fr;
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
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

{#each stocks as s}
  <Slat
    onDelete={() => {
      stockAction.remove(s);
    }}>
    <div class="main_display">
      <div class="column">
        <small>Month</small>
        <h2 class="property">{getShortMonth(s.date)}</h2>
      </div>
      <div class="column">
        <small>Type</small>
        <h2 class="property">{getStockTypeName(s.stockTypeId)}</h2>
      </div>
      <div class="column">
        <small>Amount</small>
        <h2 class="property">{formatCurrency(s.amount)}</h2>
      </div>
    </div>
    <div slot="open">
      <div class="row">
        <small>Investment type</small>
        <span>{getStockTypeName(s.stockTypeId)}</span>
      </div>
      <div class="row">
        <small>Investment date</small>
        <span>{formatDate(s.date.toDate())}</span>
      </div>
    </div>
    <div slot="edit-dialog">
      <EditStock initialStock={s} />
    </div>
  </Slat>
{/each}
