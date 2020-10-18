<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import {
    primary,
    secondary,
    primaryLight,
    success,
    danger,
    medium,
  } from "../utils/cssColors";
  export let title = "";
  export let type: Chart.ChartType = "line";
  export let labels: string[];
  export let options: object = {};
  export let datasets: Chart.ChartDataSets[];
  export let withBackgroundColor = false;

  const chartId = Math.random().toString();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isLandscape = vw > vh;

  const colors = [primary, secondary, success, danger];

  const createChart = (
    type,
    labels,
    options,
    datasets,
    withBackgroundColor
  ) => {
    const processedDataset: Chart.ChartDataSets[] = datasets.map(
      (ds, index) => ({
        backgroundColor: withBackgroundColor ? primaryLight : "transparent",
        borderColor: colors[index],
        borderWidth: 1,
        lineTension: 0,
        barThickness: 10,
        hoverBackgroundColor: medium,
        ...ds,
      })
    );
    const ctx = (document.getElementById(
      chartId
    ) as HTMLCanvasElement).getContext("2d");
    new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: processedDataset,
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        maintainAspectRatio: !isLandscape,
        responsive: true,
        ...options,
      },
    });
  };

  let mounted = false;
  onMount(() => {
    mounted = true;
  });

  $: if (mounted) {
    createChart(type, labels, options, datasets, withBackgroundColor);
  }
</script>

<style>
  .isLandscape {
    position: relative;
    margin: auto;
    height: 60vh;
    width: 80vw;
  }
</style>

<h2>{title}</h2>
<div class:isLandscape>
  <canvas id={chartId} width="16" height="10" />
</div>
