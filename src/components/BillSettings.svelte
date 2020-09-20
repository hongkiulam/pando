<script lang="ts">
  import { db } from "../firebase";
  $: billTypes = $db?.billTypes || [];
</script>

{#each billTypes as { name, default: defaultAmount, frequency,id }}
  {name}{defaultAmount}{frequency}{id}
{/each}
