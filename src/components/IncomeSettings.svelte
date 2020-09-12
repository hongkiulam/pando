<script lang="ts">
  import { db } from "../firebase";
  $: incomeTypes = $db?.incomeTypes || [];
</script>

{#each incomeTypes as { name, default: defaultAmount, frequency }}
  {name}{defaultAmount}{frequency}
{/each}
