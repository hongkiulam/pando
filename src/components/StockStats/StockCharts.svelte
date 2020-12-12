<script lang="ts">
  import Chart from "../Chart.svelte";
  import Loading from "../Loading.svelte";
  import { db } from "../../firebase";
  import { vanguard } from "../../store";
  import {
    amountByTypeId,
    cumulativeChart,
    timeOptions,
  } from "../../utils/chart";
  import { vg } from "../../actions";

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
  vg.get("valuationHistory");
  $: valuationHistoryDS = [
    {
      label: "Valuation History",
      data: $vanguard.data.valuationHistory?.map((item) => {
        return { x: new Date(item.date), y: item.value };
      }),
      pointRadius: 0,
    },
  ];
</script>

{#if $vanguard.loading}
  <Loading />
{:else}
  <Chart
    title="Valuation History"
    datasets={valuationHistoryDS}
    options={timeOptions('day', { tooltips: { mode: 'x-axis' } })} />
{/if}
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
