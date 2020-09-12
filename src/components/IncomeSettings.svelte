<script lang="ts">
  import Loading from "./Loading.svelte";
  import { db } from "../firebase";
  $: incomeTypes = $db?.incomeTypes || [];
</script>

{#each incomeTypes as { name, default: defaultAmount, frequency }}
  {name}{defaultAmount}{frequency}
{:else}
  <Loading full />
{/each}
