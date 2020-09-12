<script lang="ts">
  import { TextField } from "attractions";
  import { db } from "../firebase";
  $: splitRatio = $db?.splitRatio;
</script>

{#if splitRatio !== undefined}
  <TextField />
  {splitRatio}:{100 - splitRatio}
{/if}
