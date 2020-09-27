<script lang="ts">
  import { Content, Actions } from "@smui/dialog";
  import TextField from "@smui/textfield";
  import SaveCancelButtonGroup from "../SaveCancelButtonGroup.svelte";
  import FrequencySelect from "../FrequencySelect.svelte";

  import type { IncomeType } from "../../types/db";
  import { incomeSettings } from "../../actions";

  export let create: boolean = false;
  export let initialIncomeType: IncomeType = {
    name: "",
    default: 0,
    frequency: "MONTHLY",
  };
  let modified: IncomeType = {
    ...initialIncomeType,
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
