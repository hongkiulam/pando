<script lang="ts">
  import Loading from "./Loading.svelte";
  import { db } from "../firebase";
  $: splitRatio = $db?.splitRatio;
</script>

{#if splitRatio !== undefined}
  {splitRatio}:{100 - splitRatio}
{:else}
  <Loading full />
{/if}
