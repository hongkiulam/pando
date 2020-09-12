<script lang="ts">
  import Input from "../components/Input.svelte";
  import Button from "attractions/button";
  import { db } from "../firebase";

  let toSaving = $db.splitRatio;
  $: toSpending = 100 - toSaving;

  $: validationError = toSaving < 1 || toSaving > 99;
  $: isDirty = $db.splitRatio !== toSaving;
</script>

<Input
  type="number"
  label="To Saving"
  withItem
  itemRight
  bind:value={toSaving}
  error={validationError && 'Value must be between 1 and 99'}>
  %
</Input>
<Input
  type="number"
  disabled
  label="To Spending"
  withItem
  itemRight
  bind:value={toSpending}>
  %
</Input>
{#if isDirty}
  <Button outline>Save</Button>
{/if}
