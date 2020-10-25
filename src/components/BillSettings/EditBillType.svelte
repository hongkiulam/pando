<script>
  import { Content, Actions } from "@smui/dialog";
  import TextField from "@smui/textfield";
  import SaveCancelButtonGroup from "../SaveCancelButtonGroup.svelte";
  import FrequencySelect from "../FrequencySelect.svelte";

  // import type { BillType } from "../../types/db";
  import { billSettings } from "../../actions";
  import { isoToTimestamp, timeStampToISO } from "../../utils/date";

  export let create = false;
  export let initialBillType = {
    name: "",
    default: 0,
    frequency: "MONTHLY",
    startDate: undefined,
  };

  let modified = {
    ...initialBillType,
  };

  $: if (modified.frequency === "ONEOFF") {
    delete modified.startDate;
  } else {
    modified.startDate = modified.startDate || initialBillType.startDate;
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
      on:change={(e) => {
        modified.startDate = isoToTimestamp(e.target.value);
      }}
      style="width:100%" />
  {/if}
</Content>
<Actions>
  <SaveCancelButtonGroup
    on:cancel={() => {
      modified = { ...initialBillType };
    }}
    on:save={() => {
      if (!isValid) return;
      if (!create) {
        billSettings.update(modified);
      } else {
        billSettings.add(modified);
        modified = { ...initialBillType };
      }
    }} />
</Actions>
