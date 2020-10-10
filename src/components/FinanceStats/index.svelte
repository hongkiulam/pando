<script lang="ts">
  import Slat from "../Slat.svelte";
  import { db } from "../../firebase";
  import { goto } from "@sveltech/routify";
  import { getShortMonth } from "../../utils/date";

  $: finances = $db ? $db.finance : [];
  $: incomeTypes = $db ? $db.incomeTypes : [];
  $: billTypes = $db ? $db.billTypes : [];
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
      <h1>{getShortMonth(f.date)}</h1>
      <div class="slat_header_info">
        <div class="row">
          <small>To spend</small>
          <h2>£{f.spending}</h2>
        </div>
        <div class="row">
          <small>To save</small>
          <h2>£{f.saved}</h2>
        </div>
      </div>
    </div>
    <div slot="open" class="slat_detail">
      {#each f.income as { incomeTypeId, amount }}
        <div class="detail_row">
          <small>{incomeTypes.find((x) => x.id === incomeTypeId).name}</small>
          <span>£{amount}</span>
        </div>
      {/each}
      {#each f.bills as { billTypeId, amount }}
        <div class="detail_row">
          <small>{billTypes.find((x) => x.id === billTypeId).name}</small>
          <span>(£{amount})</span>
        </div>
      {/each}
      <div class="detail_row">
        <small>Remaining Saving</small>
        <span>£{f.remainingSaved}</span>
      </div>
      <div class="detail_row">
        <small>Remaining Spending</small>
        <span>£{f.remainingSpending}</span>
      </div>
      <div class="detail_row">
        <small>Accumulated Saving</small>
        <span>£{f.remainingSaved + f.saved}</span>
      </div>
      <div class="detail_row">
        <small>Accumulated Spending</small>
        <span>£{f.remainingSpending + f.spending}</span>
      </div>
    </div>
  </Slat>
{/each}
