<script>
  import { Content, Actions } from "@smui/dialog";
  import TextField from "@smui/textfield";
  import SaveCancelButtonGroup from "../SaveCancelButtonGroup.svelte";
  import FrequencySelect from "../FrequencySelect.svelte";

  // import type { IncomeType } from "../../types/db";
  import { incomeSettings } from "../../actions";
  import { isoToTimestamp, timeStampToISO } from "../../utils/date";

  export let create = false;
  export let initialIncomeType = {
    name: "",
    default: 0,
    frequency: "MONTHLY",
    startDate: undefined,
  };
  let modified = {
    ...initialIncomeType,
  };

  // Reinitialise or delete startDate property depending on frequency
  $: if (modified.frequency === "ONEOFF") {
    delete modified.startDate;
  } else {
    modified.startDate = modified.startDate || initialIncomeType.startDate;
  }

  let isValid = false;
  $: isValid =
    !!modified.name &&
    !!modified.frequency &&
    !!modified.default &&
    (modified.frequency === "ONEOFF" || !!modified.startDate);
</script>

<Content id="edit-content">
  <TextField
    label="Type (Name)"
    bind:value={modified.name}
    style="width:100%" />
  <FrequencySelect bind:value={modified.frequency} />
  <TextField
    type="number"
    label="Default Amount"
    bind:value={modified.default}
    style="width:100%" />
  {#if modified.frequency !== 'ONEOFF'}
    <TextField
      type="date"
      label="Start Date"
      value={timeStampToISO(modified.startDate)}
      style="width:100%"
      on:change={(e) => {
        modified.startDate = isoToTimestamp(e.target.value);
      }} />
  {/if}
</Content>
<Actions>
  <SaveCancelButtonGroup
    on:cancel={() => {
      modified = { ...initialIncomeType };
    }}
    on:save={() => {
      if (!isValid) return;
      if (!create) {
        incomeSettings.update(modified);
      } else {
        incomeSettings.add(modified);
        modified = { ...initialIncomeType };
      }
    }} />
</Actions>
