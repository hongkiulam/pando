<script>
  import { db } from "../firebase";
  import TextField from "@smui/textfield";
  import Button, { Icon, Label } from "@smui/button";
  import IconButton from "@smui/icon-button";
  import Select, { Option } from "@smui/select";
  // either the bills or income property on finance
  export let expenseArr;
  // income or bill
  export let type;

  // array of expense types used for select dropdown
  const expenseTypes = $db
    ? $db[type === "income" ? "incomeTypes" : "billTypes"]
    : [];

  const idKey = type === "income" ? "incomeTypeId" : "billTypeId";

  const removeItem = (index) => {
    const removedItem = [...expenseArr];
    removedItem.splice(index, 1);
    expenseArr = removedItem;
  };

  const addItem = () => {
    // add an item to the expenseType array, initialise with first item in expenseTypes
    expenseArr = [
      ...expenseArr,
      { [idKey]: expenseTypes[0].id, amount: expenseTypes[0].default },
    ];
  };
</script>

<style lang="scss">
  .input_container {
    display: flex;
    width: 100%;
    align-items: center;
    :global(.mdc-select) {
      flex: 1;
      margin-right: var(--paddingS);
    }
  }
</style>

{#each expenseArr as expenseItem, index}
  <div class="input_container">
    <Select
      value={expenseItem[idKey]}
      label="Type"
      on:change={(e) => {
        const expenseTypeId = Number(e.target.value);
        const defaultAmount = expenseTypes.find((expenseType) => expenseType.id === expenseTypeId).default;
        expenseItem[idKey] = expenseTypeId;
        expenseItem.amount = defaultAmount;
      }}>
      {#each expenseTypes as eT}
        <Option value={eT.id} selected={expenseItem[idKey] === eT.id}>
          {eT.name}
        </Option>
      {/each}
    </Select>
    <TextField
      label="Amount"
      type="number"
      bind:value={expenseItem.amount}
      invalid={false} />
    <IconButton
      on:click={() => {
        removeItem(index);
      }}>
      <Icon class="material-icons">delete</Icon>
    </IconButton>
  </div>
{/each}

<Button on:click={addItem}>
  <Icon class="material-icons">add</Icon>
  <Label>Add {type}</Label>
</Button>
