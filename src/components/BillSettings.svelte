<script lang="ts">
  import { db } from "../firebase";
  $: billTypes = $db?.billTypes || [];
</script>

{#each billTypes as { name, default: defaultAmount, frequency }}
  {name}{defaultAmount}{frequency}
{/each}
