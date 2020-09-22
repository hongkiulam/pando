<script>
  import { createEventDispatcher } from "svelte";
  import { Button } from "attractions";

  const dispatch = createEventDispatcher();

  const onCancel = () => {
    dispatch("cancel");
  };
  const onSave = () => {
    dispatch("save");
  };
</script>

<style lang="scss">
  .button_group {
    display: flex;
    justify-content: flex-end;
    width: 30%;
    max-width: 400px;
    min-width: 250px;
    margin-left: auto;
    :global(button:first-child) {
      margin-right: 10px;
    }
  }
</style>

<div class="button_group">
  <Button rectangle outline small on:click={onCancel}>Cancel</Button>
  <Button rectangle filled small on:click={onSave}>Save</Button>
</div>
