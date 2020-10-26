<script>
  import TextField from "@smui/textfield";
  import Button, { Icon, Label } from "@smui/button";
  import ExpenseTypeInput from "./ExpenseTypeInput.svelte";
  import { db } from "../firebase";
  import {
    dateToTimestamp,
    isoToTimestamp,
    timeStampToISO,
  } from "../utils/date";
  import { getNextExpenseTypes } from "../utils/getNextExpenseTypes";

  /**
   * @type function(finance)
   * */
  export let onFinish;
  export let initialFinance = {};

  const billTypes = $db ? $db.billTypes : [];
  const incomeTypes = $db ? $db.incomeTypes : [];
  const splitRatio = $db ? $db.splitRatio : 80;

  const mapNextExpenseTypeToFinanceProperty = (types, idKey) => {
    return getNextExpenseTypes(types).map((type) => ({
      amount: type.default,
      [idKey]: type.id,
    }));
  };

  const defaultBillTypes = mapNextExpenseTypeToFinanceProperty(
    billTypes,
    "billTypeId"
  );
  const defaultIncomeTypes = mapNextExpenseTypeToFinanceProperty(
    incomeTypes,
    "incomeTypeId"
  );

  let modified = initialFinance.saved
    ? initialFinance
    : {
        bills: defaultBillTypes,
        income: defaultIncomeTypes,
        remainingSaved: 0,
        remainingSpending: 0,
        saved: 0,
        spending: 0,
        date: dateToTimestamp(new Date()),
      };

  $: totalIncome = modified.income.reduce((acc, cur) => acc + cur.amount, 0);
  $: totalBills = modified.bills.reduce((acc, cur) => acc + cur.amount, 0);
  $: net = totalIncome - totalBills;
  $: saved = parseFloat((net * (splitRatio / 100)).toFixed(2));
  $: spending = parseFloat((net - saved).toFixed(2));

  $: accSaved = modified.remainingSaved + saved;
  $: accSpending = modified.remainingSpending + spending;
</script>

<style lang="scss">
  .container {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    align-items: center;
    gap: var(--padding);
    width: 100%;
    height: 100%;
  }
  .inputs {
    display: grid;
    grid-auto-flow: row;
    gap: var(--padding);
  }
  .group {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    h2 {
      width: 100%;
    }
  }
</style>

<div class="container">
  <div class="inputs">
    <div class="group">
      <h2>Date</h2>
      <TextField
        type="date"
        value={timeStampToISO(modified.date)}
        on:change={(e) => {
          modified.date = isoToTimestamp(e.target.value);
        }}
        style="width:100%" />
    </div>
    <div class="group">
      <h2>Income</h2>
      <ExpenseTypeInput bind:expenseArr={modified.income} type="income" />
    </div>
    <div class="group">
      <h2>Bills</h2>
      <ExpenseTypeInput bind:expenseArr={modified.bills} type="bill" />
    </div>
    <div class="group">
      <h2>Remaining</h2>
      <TextField
        type="number"
        label="Saved"
        bind:value={modified.remainingSaved}
        style="width:100%"
        step="0.1"
        invalid={false} />
      <TextField
        type="number"
        label="Spending"
        bind:value={modified.remainingSpending}
        style="width:100%"
        invalid={false} />

    </div>
  </div>
  <Button
    color="secondary"
    variant="raised"
    href="/stats"
    on:click={() => {
      modified = { ...modified, saved, spending, accSaved, accSpending };
      onFinish(modified);
    }}>
    <Label>Finish</Label>
    <Icon class="material-icons">check</Icon>
  </Button>
</div>
