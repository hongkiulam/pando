<script lang="ts">
  import { db } from "../firebase";
  import { url } from "../store";
  import Card from "../components/Card.svelte";
  import { formatCurrency } from "../utils/formatCurrency";
  $url = "/";
  $: finances = $db ? $db.finance : [];
  $: stocks = $db ? $db.stocks : [];
  $: totalInvested = stocks.reduce((acc, curr) => acc + curr.amount, 0);

  $: earnedToDate = () => {
    const earned = finances.reduce((acc, curr) => {
      const thisMonthsIncome = curr.income.reduce((a, c) => a + c.amount, 0);
      return acc + thisMonthsIncome;
    }, 0);
    return earned;
  };

  const daysUntilNextPayment = () => {
    const today = new Date();
    const firstOfNext = new Date(today.getMonth() + 1);
    firstOfNext.setDate(0);
    return firstOfNext.getDate() - today.getDate() - 1;
  };
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: row wrap;
    gap: var(--padding);
    padding: var(--padding);
  }
</style>

<!-- <pre>{JSON.stringify($db, null, 2)}</pre> -->
<div class="container">
  <Card
    data={[{ title: 'Total saved', content: formatCurrency(finances[0].accSaved) }, { title: 'Allocated spending', content: formatCurrency(finances[0].accSpending) }]}
    fancy />
  <Card
    data={[{ title: 'Next payment in', content: daysUntilNextPayment().toString() + ' days' }]}
    small />
  <Card
    data={[{ title: 'Total invested', content: formatCurrency(totalInvested) }]}
    small />
  <Card
    data={[{ title: 'Earned to date', content: formatCurrency(earnedToDate()) }]}
    small />

</div>
