<script lang="ts">
  import FinanceInput from "../../components/FinanceInput.svelte";
  import Loading from "../../components/Loading.svelte";
  import { finance } from "../../actions";
  import { params } from "@sveltech/routify";
  import { url } from "../../store";
  import { db } from "../../firebase";
  $url = "/edit";
  $: financeId = $params.id;
  $: finances = $db ? $db.finance : [];
  let initialFinance;
  $: initialFinance = finances.find((f) => f.id === Number(financeId));
</script>

<style>
  .container {
    padding: var(--padding);
    flex: 1;
  }
</style>

<div class="container">
  {#if initialFinance}
    <FinanceInput
      onFinish={(newFinance) => {
        finance.update(newFinance);
      }}
      {initialFinance} />
  {:else}
    <Loading full />
  {/if}
</div>
