<script lang="ts">
  import Slat from "../Slat.svelte";
  import { db } from "../../firebase";
  import { goto } from "@sveltech/routify";
  import { getShortMonth } from "../../utils/date";
  import { DateTime } from "luxon";
  import { formatCurrency } from "../../utils/formatCurrency";
  import type { Finance } from "../../types/db";

  export let finances: Finance[];
  $: incomeTypes = $db ? $db.incomeTypes : [];
  $: billTypes = $db ? $db.billTypes : [];

  const getShortYear = (date: Date) => {
    return DateTime.fromJSDate(date).toFormat("yyyy");
  };

  const getNetIncome = (finance: Finance) => {
    const totalIncome = finance.income.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    const totalBills = finance.bills.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    return totalIncome - totalBills;
  };
</script>

<style lang="scss">
  .slat_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .slat_header_info {
    margin-right: var(--padding);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    .row {
      display: grid;
      gap: var(--paddingS);
      grid-template-columns: auto minmax(65px, auto);
      align-items: center;
      text-align: right;
    }
  }
  .slat_detail {
    display: flex;
    flex-direction: column;
  }
  .detail_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--paddingS);
    border-bottom: 1px solid var(--medium);
  }
</style>

{#each finances as f}
  <Slat
    hideDelete
    editOnClick={() => {
      $goto('/edit/' + f.id);
    }}>
    <div class="slat_content">
      <h1>
        {getShortMonth(f.date)}
        <small>{getShortYear(f.date.toDate())}</small>
      </h1>
      <div class="slat_header_info">
        <div class="row">
          <small>To spend</small>
          <h2>{formatCurrency(f.spending)}</h2>
        </div>
        <div class="row">
          <small>To save</small>
          <h2>{formatCurrency(f.saved)}</h2>
        </div>
      </div>
    </div>
    <div slot="open" class="slat_detail">
      {#each f.income as { incomeTypeId, amount }}
        <div class="detail_row">
          <small>{incomeTypes.find((x) => x.id === incomeTypeId).name}</small>
          <span>{formatCurrency(amount)}</span>
        </div>
      {/each}
      {#each f.bills as { billTypeId, amount }}
        <div class="detail_row">
          <small>{billTypes.find((x) => x.id === billTypeId).name}</small>
          <span>({formatCurrency(amount)})</span>
        </div>
      {/each}
      <div class="detail_row">
        <small>Net Income</small>
        <span>{formatCurrency(getNetIncome(f))}</span>
      </div>
      <div class="detail_row">
        <small>Remaining Saving</small>
        <span>{formatCurrency(f.remainingSaved)}</span>
      </div>
      <div class="detail_row">
        <small>Remaining Spending</small>
        <span>{formatCurrency(f.remainingSpending)}</span>
      </div>
      <div class="detail_row">
        <small>Accumulated Saving</small>
        <span>{formatCurrency(f.remainingSaved + f.saved)}</span>
      </div>
      <div class="detail_row">
        <small>Accumulated Spending</small>
        <span>{formatCurrency(f.remainingSpending + f.spending)}</span>
      </div>
    </div>
  </Slat>
{/each}
