<script lang="ts">
  import Input from "../components/Input.svelte";
  import SaveCancelButtonGroup from "../components/SaveCancelButtonGroup.svelte";
  import { db } from "../firebase";
  import { splitRatio } from "../actions";

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
  <SaveCancelButtonGroup
    on:cancel={() => {
      toSaving = $db.splitRatio;
    }}
    on:save={() => {
      !validationError && splitRatio.update(toSaving);
    }} />
{/if}
