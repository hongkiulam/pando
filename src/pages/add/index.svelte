<script>
  import FinanceInput from "../../components/FinanceInput.svelte";
  import { finance } from "../../actions";
</script>

<style>
  .container {
    padding: var(--padding);
    flex: 1;
}
</style>

<div class="container">
  <FinanceInput
    onFinish={(newFinance) => {
      finance.add(newFinance);
    }} />
</div>