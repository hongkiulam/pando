<script lang="ts">
  import Chart from "../Chart.svelte";
  import { db } from "../../firebase";
  import {
    amountByTypeId,
    cumulativeChart,
    timeOptions,
  } from "../../utils/chart";

  // everything using $: reactive statement so they react to changes in the db
  $: stocks = $db ? $db.stocks : [];
  $: stockTypes = $db ? $db.stockTypes : [];

  $: stockInvestmentsDS = amountByTypeId(stocks, stockTypes, "stockTypeId");
  $: accumulatedStocksDS = cumulativeChart(stocks, "amount").toTimeDataset(
    "Invested to date"
  );
  $: accumulatedStocksByTypeDS = stockTypes.map((sT) => {
    const filtered = stocks.filter((stock) => stock.stockTypeId === sT.id);
    return cumulativeChart(filtered, "amount").toTimeDataset(sT.name)[0];
  });

  $: combined = [...accumulatedStocksDS, ...accumulatedStocksByTypeDS];
</script>

{#if $db}
  <Chart
    title="Stock Investments"
    datasets={stockInvestmentsDS}
    options={timeOptions('day')} />

  <!-- <Chart
  title="Accumulated Stocks"
  datasets={accumulatedStocksDS}
  options={timeOptions('day')} />

<Chart
  title="Accumulated Stocks By Type"
  datasets={accumulatedStocksByTypeDS}
  options={timeOptions('day')} /> -->

  <Chart
    title="Accumulated Stocks"
    datasets={combined}
    options={timeOptions('day')} />
{/if}
