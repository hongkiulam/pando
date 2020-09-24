<script>
  import { createEventDispatcher } from "svelte";
  import Button, { Label, Icon } from "@smui/button";
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
  <Button variant="outline" on:click={onCancel}>
    <Label>Cancel</Label>
    <Icon class="material-icons">clear</Icon>
  </Button>
  <Button variant="unelevated" on:click={onSave}>
    <Label>Save</Label>
    <Icon class="material-icons">save</Icon>
  </Button>
</div>
