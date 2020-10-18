<script lang="ts">
  import Chart from "../Chart.svelte";
  import { db } from "../../firebase";
  import { timeOptions } from "../../utils/chart";
  import type { FirestoreTimeStamp } from "../../types/db";

  const finances = $db ? $db.finance : [];

  const propertyToTimeDataset = <T extends { date: FirestoreTimeStamp }>(
    arr: T[],
    property: keyof T,
    label: string
  ) => {
    return {
      label,
      data: arr.map((el) => ({ x: el.date.toDate(), y: el[property] as any })),
    };
  };

  const accumulated = [
    propertyToTimeDataset(finances, "accSpending", "Acc. Spending"),
    propertyToTimeDataset(finances, "accSaved", "Acc. Saving"),
  ];

  const remaining = [
    propertyToTimeDataset(finances, "remainingSpending", "Rem. Spending"),
    propertyToTimeDataset(finances, "remainingSaved", "Rem. Saving"),
  ];

  const spendEachMonth: Chart.ChartDataSets[] = [
    {
      label: "Spent per month",
      data: finances.map((f, i) => {
        // since data is from latest to earliest, last month is index + 1
        let lastMonthAcc;
        if (i === finances.length - 1) {
          lastMonthAcc = 0; // earliest record, default to 0
        } else {
          lastMonthAcc = finances[i + 1].accSpending;
        }
        const thisMonthRem = f.remainingSpending;
        let spent = lastMonthAcc - thisMonthRem;
        if (spent < 0) {
          spent = 0; // we havent spent anything and balance has gone up,probably interest.
        }
        return { x: f.date.toDate(), y: spent };
      }),
    },
  ];

  const incomePerMonth = {
    label: "Income per month",
    data: finances.map((f) => {
      const totalIncome = f.income
        .map((income) => income.amount)
        .reduce((acc, curr) => acc + curr, 0);
      return { x: f.date.toDate(), y: totalIncome };
    }),
  };
  const billsPerMonth = {
    label: "Bills per month",
    data: finances.map((f) => {
      const totalBills = f.bills
        .map((b) => b.amount)
        .reduce((acc, curr) => acc + curr, 0);
      return { x: f.date.toDate(), y: totalBills };
    }),
  };
</script>

<Chart
  title="Accumulated Spending/ Saving"
  datasets={accumulated}
  options={timeOptions('day')} />
<Chart
  title="Remaining Spending/ Saving"
  datasets={remaining}
  options={timeOptions('day')} />
<Chart
  title="Spending per month"
  type="bar"
  datasets={spendEachMonth}
  options={timeOptions('day')}
  withBackgroundColor />
<Chart
  title="Income and Bills per month"
  type="bar"
  datasets={[incomePerMonth, billsPerMonth]}
  options={timeOptions('day', {
    scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] },
  })} />
