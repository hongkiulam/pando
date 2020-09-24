<script lang="ts">
  import SaveCancelButtonGroup from "../components/SaveCancelButtonGroup.svelte";
  import TextField from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";
  import { db } from "../firebase";
  import { splitRatio } from "../actions";

  let toSaving = $db.splitRatio;
  $: toSpending = 100 - toSaving;

  $: validationError = toSaving < 1 || toSaving > 99;
  $: isDirty = $db.splitRatio !== toSaving;
</script>

<style>
  .container {
    display: grid;
    grid-auto-flow: row;
    gap: var(--padding);
  }
</style>

<div class="container">
  <div>
    <TextField
      type="number"
      label="To Saving"
      bind:value={toSaving}
      style="width:100%" />
    <HelperText>Value must be between 1 and 99</HelperText>
  </div>

  <TextField
    type="number"
    disabled
    label="To Spending"
    bind:value={toSpending}
    style="width:100%" />

  {#if isDirty}
    <SaveCancelButtonGroup
      on:cancel={() => {
        toSaving = $db.splitRatio;
      }}
      on:save={() => {
        !validationError && splitRatio.update(toSaving);
      }} />
  {/if}
</div>
