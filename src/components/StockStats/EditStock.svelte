<script>
  import { Content, Actions } from "@smui/dialog";
  import TextField from "@smui/textfield";
  import SaveCancelButtonGroup from "../SaveCancelButtonGroup.svelte";
  import StockTypeSelect from "../StockTypeSelect.svelte";

  // import type { Stock } from "../../types/db";
  import { stocks } from "../../actions";
  import { isoToTimestamp, timeStampToISO } from "../../utils/date";

  export let create = false;
  export let initialStock = {
    date: null,
    amount: 0,
    stockTypeId: null,
  };

  let modified = {
    ...initialStock,
  };

  let isValid = false;
  $: isValid = !!modified.date && !!modified.amount && !!modified.stockTypeId;
</script>

<Content id="edit-content">
  <TextField
    type="date"
    label="Date"
    value={timeStampToISO(modified.date)}
    on:change={(e) => {
      modified.date = isoToTimestamp(e.target.value);
    }}
    style="width:100%" />
  <StockTypeSelect
    bind:value={modified.stockTypeId}
    onChange={(d) => {
      modified.amount = d;
    }} />
  <TextField
    type="number"
    label="Amount"
    bind:value={modified.amount}
    style="width:100%" />
</Content>
<Actions>
  <SaveCancelButtonGroup
    on:cancel={() => {
      modified = { ...initialStock };
    }}
    on:save={() => {
      if (!isValid) return;
      if (!create) {
        stocks.update(modified);
      } else {
        stocks.add(modified);
        modified = { ...initialStock };
      }
    }} />
</Actions>
