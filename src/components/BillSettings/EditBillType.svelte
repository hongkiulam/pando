<script lang="ts">
  import { Content, Actions } from "@smui/dialog";
  import TextField from "@smui/textfield";
  import SaveCancelButtonGroup from "../SaveCancelButtonGroup.svelte";
  import FrequencySelect from "../FrequencySelect.svelte";

  import type { BillType } from "../../types/db";
  import { billSettings } from "../../actions";

  export let create: boolean = false;
  export let initialBillType: BillType = {
    name: "",
    default: 0,
    frequency: "MONTHLY",
  };
  let modified: BillType = {
    ...initialBillType,
  };
  let isValid = false;
  $: isValid = !!modified.name && !!modified.frequency && !!modified.default;
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
