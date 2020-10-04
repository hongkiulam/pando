<script>
  import { Content, Actions } from "@smui/dialog";
  import TextField from "@smui/textfield";
  import SaveCancelButtonGroup from "../SaveCancelButtonGroup.svelte";

  // import type { IncomeType } from "../../types/db";
  import { stockSettings } from "../../actions";

  export let create = false;
  export let initialStockType = {
    name: "",
    default: 0,
  };
  let modified = {
    ...initialStockType,
  };

  let isValid = false;
  $: isValid = !!modified.name && !!modified.default;
</script>

<Content id="edit-content">
  <TextField
    label="Type (Name)"
    bind:value={modified.name}
    style="width:100%" />
  <TextField
    type="number"
    label="Default Amount"
    bind:value={modified.default}
    style="width:100%" />
</Content>
<Actions>
  <SaveCancelButtonGroup
    on:cancel={() => {
      modified = { ...initialStockType };
    }}
    on:save={() => {
      if (!isValid) return;
      if (!create) {
        stockSettings.update(modified);
      } else {
        stockSettings.add(modified);
        modified = { ...initialStockType };
      }
    }} />
</Actions>
