<script>
  import Select, { Option } from "@smui/select";
  import { db } from "../firebase";
  /**
   * @type number
   * */
  export let value;
  /**
   * @param {number} defaultAmount
   * */
  export let onChange =  (defaultAmount) => {}
  export let fullWidth = true;
  $: stockTypes = $db ? $db.stockTypes : [];

  $: if (!value && stockTypes.length > 0) {
    value = stockTypes[0].id;
  }

</script>

<style lang="scss">
  .fullWidth {
    :global(.mdc-select) {
      width: 100%;
    }
  }
</style>

<div class:fullWidth>
  <Select
    {value}
    label="Stock Type"
    on:change={(e) => {
      const stockTypeId = Number(e.target.value);
      value = stockTypeId;
      // pass back default amount
      const selectedStockType = stockTypes.find(x => x.id === stockTypeId);
      if (selectedStockType) {
        onChange(selectedStockType.default);
      }
    }}>
    {#each stockTypes as sT}
      <Option value={sT.id} selected={value === sT.id}>{sT.name}</Option>
    {/each}
  </Select>
</div>
