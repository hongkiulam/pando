<script lang="ts">
  import Loading from "./Loading.svelte";
  import { db } from "../firebase";
  $: billTypes = $db?.billTypes || [];
</script>

{#each billTypes as { name, default: defaultAmount, frequency }}
  {name}{defaultAmount}{frequency}
{:else}
  <Loading full />
{/each}
