<script lang="ts">
  import Select, { Option } from "@smui/select";

  import type { Frequency } from "../types/db";
  export let value: Frequency = "MONTHLY";
  export let label = "Frequency";
  export let fullWidth = true;
</script>

<style lang="scss">
  .fullWidth {
    :global(.mdc-select) {
      width: 100%;
    }
  }
</style>

<div class:fullWidth>
  <Select bind:value {label}>
    {#each ['YEARLY', 'MONTHLY', 'ONEOFF'] as freq}
      <Option value={freq} selected={value === freq}>{freq}</Option>
    {/each}
  </Select>
</div>
