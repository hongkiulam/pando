<script lang="ts">
  import { TextField } from "attractions";
  export let value: string | number;
  export let error: string;
  export let withItem: boolean;
  export let itemRight: boolean;
  export let type: string;
  export let outline: boolean;
  export let label: string = "";
  export let autoFocus: boolean;

  let isFocussed = false;
</script>

<style>
  .input_item {
    top: 0 !important;
    line-height: 2.8rem;
  }
  .input {
    margin-bottom: var(--padding);
  }
  .isFocussed {
    color: var(--primary);
  }
</style>

<div class="input">
  <span class:isFocussed>{label}</span>
  <TextField
    bind:value
    events={[{ name: 'focus', handler: () => {
          isFocussed = true;
        } }, { name: 'blur', handler: () => {
          isFocussed = false;
        } }]}
    {type}
    {withItem}
    {itemRight}
    {error}
    {outline}
    {autoFocus}
    {...$$restProps}>
    <span class="item input_item">
      <slot />
    </span>
  </TextField>
</div>
