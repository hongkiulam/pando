<script lang="ts">
  import { db } from "../firebase";
  import { url, user, vanguard, vanguardLoggedIn } from "../store";
  import Card from "../components/Card.svelte";
  import { formatCurrency } from "../utils/formatCurrency";
  import { getNextExpenseTypes } from "../utils/getNextExpenseTypes";
  import { vg } from "../actions";
  $url = "/";
  $: finances = $db ? $db.finance : [];
  $: stocks = $db ? $db.stocks : [];
  $: billTypes = $db ? $db.billTypes : [];
  $: totalInvested = stocks.reduce((acc, curr) => acc + curr?.amount, 0);

  $: earnedToDate = () => {
    const earned = finances.reduce((acc, curr) => {
      const thisMonthsIncome = curr?.income?.reduce((a, c) => a + c.amount, 0);
      return acc + thisMonthsIncome;
    }, 0);
    return earned;
  };

  $: estimatedNextBill = () => {
    return getNextExpenseTypes(billTypes).reduce(
      (acc, curr) => acc + curr?.default,
      0
    );
  };

  const daysUntilNextPayment = () => {
    const today = new Date();
    const firstOfNext = new Date(today.getMonth() + 1);
    firstOfNext.setDate(0);
    return firstOfNext.getDate() - today.getDate();
  };

  if (!$user.isGuest) {
    vg.get("performance");
  }

  $: vanguardCardData = [
    {
      title: "Vanguard Value",
      content: $vanguardLoggedIn
        ? formatCurrency($vanguard.data.performance?.value)
        : "Not Logged In",
    },
    {
      title: "Vanguard ROI",
      content: $vanguardLoggedIn
        ? formatCurrency($vanguard.data.performance?.amountChange)
        : "Not Logged In",
    },
    {
      title: "Vanguard Perc. change",
      content: $vanguardLoggedIn
        ? `${($vanguard.data.performance?.percentageChange * 100).toFixed(2)}%`
        : "Not Logged In",
    },
  ];
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: row wrap;
    gap: var(--padding);
    padding: var(--padding);
  }
</style>

<div class="container">
  <Card
    data={[{ title: 'Total saved', content: formatCurrency(finances[0]?.accSaved) }, { title: 'Allocated spending', content: formatCurrency(finances[0]?.accSpending) }]}
    fancy
  />
  <Card
    data={[{ title: 'Next payment in', content: daysUntilNextPayment().toString() + ' days' }]}
    small
  />
  <Card
    data={[{ title: 'Total invested', content: formatCurrency(totalInvested) }]}
    small
  />
  <Card
    data={[{ title: 'Earned to date', content: formatCurrency(earnedToDate()) }]}
    small
  />
  <Card
    data={[{ title: 'Est. next bills', content: formatCurrency(estimatedNextBill()) }]}
    small
  />
  {#if !$user.isGuest}
    <Card data={vanguardCardData} loading={$vanguard.loading} />
  {/if}
</div>
